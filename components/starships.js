import Card from "../components/common/card";

function Starships({ starships, films }) {
  return (
    <>
      <div className="container-grid">
        <Card starships={starships} films={films} />
      </div>
    </>
  );
}

export default Starships;
