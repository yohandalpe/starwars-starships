import Image from "next/image";
import Link from "next/link";
import StarshipSampleImage from "../../public/images/starship-sample.png";

const Modal = ({ showModal }) => {
  // handle modal close button functionality
  const handleCloseButton = () => {
    showModal(false);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="container-modal">
          <div className="modal modal-large">
            <button onClick={handleCloseButton} className="button-modal-close">
              <i className="fa fa-times fa-2x" aria-hidden="true" />
            </button>
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-2">
                <h2 className="modal-title">CR90 corvette</h2>
              </div>
              <div>
                <p>
                  <span className="modal-meta">Cost:</span> 3,500,000
                </p>
                <p className="mt-2">
                  <span className="modal-meta">Featured Films:</span>
                </p>
                <ul className="mb-2">
                  <li>
                    <Link href="/1">A New Hope</Link>
                  </li>
                  <li>
                    <Link href="/2">The Empire Strikes Back</Link>
                  </li>
                  <li>
                    <Link href="/3">Return of the Jedi</Link>
                  </li>
                </ul>
                <p>
                  <span className="modal-meta">Lenght:</span> 150
                </p>
                <p className="my-2">
                  <span className="modal-meta">Max Atmospheric Speed:</span> 950
                </p>
                <p>
                  <span className="modal-meta">Crew:</span> 30-165
                </p>
              </div>
              <div>
                <Image
                  src={StarshipSampleImage}
                  alt="Starship Sample Image"
                  width={400}
                  height={220}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
