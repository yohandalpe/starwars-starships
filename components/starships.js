import Card from "../components/common/card";

function Starships({ starships, films }) {
  return (
    <>
      <div className="grid grid-cols-5 gap-5">
        <Card starships={starships} films={films} />
      </div>
    </>
  );
}

export default Starships;
