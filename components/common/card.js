import Link from "next/link";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import Modal from "./modal";

const Card = ({ starships, films }) => {
  // initialize modal state
  const [showModal, setShowModal] = useState(false);

  // handle view more button functionality
  const handleViewMore = (starship) => {
    setShowModal(true);
    console.log(starship);
  };

  // handle user rating updates
  const handleRatingChange = (newRating, starship) => {
    console.log(newRating);
    sessionStorage.setItem(starship, newRating);
    console.log(sessionStorage.getItem(starship));
  };

  //format cost value with thousand separator
  const formatValue = (value) => {
    let stringToInt = parseInt(value);
    if (Number.isInteger(stringToInt)) {
      let valueToFormat = stringToInt;
      return valueToFormat.toLocaleString();
    } else {
      return value;
    }
  };

  return (
    <>
      {showModal && <Modal showModal={setShowModal} />}
      {starships.map((starship, index) => (
        <div key={index} className="card card-base">
          <h2 className="card-title">{starship.name}</h2>
          <p className="">
            <span className="card-meta">Cost: </span>
            {formatValue(starship.cost_in_credits)}
          </p>
          <p className="mt-2">
            <span className="card-meta">Featured Films:</span>
          </p>
          <ul>
            {starship.films.map((starshipsInFilms, index) => {
              return starshipsInFilms.url === films.url ? (
                <li key={index}>
                  <Link href={`/${index + 1}`}>{films[index].title}</Link>
                </li>
              ) : (
                <li>N/A</li>
              );
            })}
          </ul>
          <div className="card-rating">
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={24}
              color2={"#facc15"}
              //value={sessionStorage.getItem(starship)}
            />
          </div>
          <div className="card-footer">
            <div
              className="button-action mt-5"
              onClick={() => handleViewMore(starship)}
            >
              View More <i className="fa fa-caret-right" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
