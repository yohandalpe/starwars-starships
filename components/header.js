import Image from "next/image";
import logo from "../public/images/starwars-logo.png";

const Header = () => {
  return (
    <>
      <div className="container-header">
        <Image src={logo} alt="StarWars" width={203} height={88} />
      </div>
    </>
  );
};

export default Header;
