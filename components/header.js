import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/starwars-logo.png";

const Header = () => {
  return (
    <>
      <div className="container-header">
        <Link href="/" passHref>
          <Image
            src={logo}
            alt="StarWars"
            width={203}
            height={88}
            className="hover:cursor-pointer"
          />
        </Link>
      </div>
    </>
  );
};

export default Header;
