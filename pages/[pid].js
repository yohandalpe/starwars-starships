import Router from "next/router";
import { useState } from "react";

function Film({ post }) {
  // initialize button text state
  const [buttonText, setButtonText] = useState("Go Back");

  // handle back button functionality
  const handleBackButton = (text) => {
    setButtonText(text);
    Router.back();
  };

  // format date to dd/mm/yyyy
  const formatDate = (date) => {
    let dateToFormat = new Date(date),
      month = "" + (dateToFormat.getMonth() + 1),
      day = "" + dateToFormat.getDate(),
      year = dateToFormat.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  return (
    <div className="container-main">
      <div className="container-main-wrapper">
        <div className="card card-large">
          <h2 className="card-title">
            {post.title} <br />
            <small>( Episode: {post.episode_id} )</small>
          </h2>

          <p className="mt-2 mb-5">{post.opening_crawl}</p>
          <p>
            <span className="card-meta">Director:</span> {post.director}
          </p>
          <p className="my-2">
            <span className="card-meta">Producer:</span> {post.producer}
          </p>
          <p>
            <span className="card-meta">Release Date:</span>{" "}
            {formatDate(post.release_date)}
          </p>
        </div>
      </div>
      <div className="container-main-wrapper">
        <div
          className="button-action"
          onClick={() => handleBackButton("Please wait...")}
        >
          {buttonText}
        </div>
      </div>
    </div>
  );
}

// fetch film data from the API and create dynamic routes
export async function getStaticPaths() {
  const res = await fetch("https://swapi.dev/api/films/?format=json");
  const posts = await res.json();

  const index = Math.floor(Math.random() * posts.count) + 1;

  const paths = posts.results.map((post) => ({
    params: {
      pid: post.episode_id.toString(),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://swapi.dev/api/films/${params.pid}?format=json`
  );
  const post = await res.json();

  return { props: { post } };
}

export default Film;
