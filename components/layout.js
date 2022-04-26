import Seo from "./common/seo";
import Footer from "./footer";
import Header from "./header";

function Layout({ children }) {
  return (
    <>
      <Seo />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
