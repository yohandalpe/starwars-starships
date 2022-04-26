import Layout from "../components/layout";
import "../styles/globals.css";
import "font-awesome/css/font-awesome.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
