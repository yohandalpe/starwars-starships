import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Router, { withRouter } from "next/router";
import Starships from "../components/starships";

function Home(props) {
  // initialize data fetch/keyword state
  const [isFetching, setFetch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const startFetching = () => setFetch(true);
  const stopFetching = () => setFetch(false);

  // route changes effect
  useEffect(() => {
    Router.events.on("routeChangeStart", startFetching);
    Router.events.on("routeChangeComplete", stopFetching);

    return () => {
      Router.events.off("routeChangeStart", startFetching);
      Router.events.off("routeChangeComplete", stopFetching);
    };
  }, []);

  // handle search functionality
  const handleSearch = (event) => {
    event.preventDefault();

    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.keyword = keyword;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  // handle pagination functionality
  const handlePagination = (page) => {
    const currentPath = props.router.pathname;
    const currentQuery = { ...props.router.query };
    currentQuery.page = page.selected + 1;

    props.router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  // display starships once data is fetch.
  let starshipsData = null;
  if (isFetching)
    starshipsData = (
      <div className="text-center">
        <i className="fa fa-spinner fa-4x fa-pulse"></i>
      </div>
    );
  else {
    starshipsData = (
      <Starships
        starships={props.starships.results}
        films={props.films.results}
      />
    );
  }

  return (
    <>
      <div className="container-main">
        <div className="container-main-wrapper">
          <input
            type="search"
            className="form-search"
            placeholder="Enter Starship Name or Model..."
            value={keyword || props.router.query.keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={handleSearch} className="button-search">
            <i className="fa fa-search" />
          </button>
        </div>
        <div className="flex justify-center">{starshipsData}</div>
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          activeClassName={"active-page"}
          containerClassName={"container-pagination"}
          pageLinkClassName={"link-pagination"}
          initialPage={props.currentPage - 1}
          pageCount={props.pageCount}
          onPageChange={handlePagination}
        />
      </div>
    </>
  );
}

// fetch starship and film data from the API
export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const keyword = query.keyword || "";
  const [starshipsRes, filmsRes] = await Promise.all([
    fetch(
      `https://swapi.dev/api/starships/?search=${keyword}&page=${page}&format=json`
    ),
    fetch(`https://swapi.dev/api/films/?format=json`),
  ]);
  const [starships, films] = await Promise.all([
    starshipsRes.json(),
    filmsRes.json(),
  ]);

  return {
    props: {
      starships: starships,
      films: films,
      totalCount: starships.count,
      pageCount: Math.ceil(starships.count / 10),
      currentPage: page,
      perPage: 10,
      isFetch: false,
    },
  };
}

export default withRouter(Home);
