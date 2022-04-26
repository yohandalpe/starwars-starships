import Head from "next/head";

const Seo = () => {
  return (
    <Head>
      <title>StarWars Starships Portal</title>
      <meta
        name="description"
        content="A Next.js app built with The Star Wars API."
      />
      <link rel="icon" href="/favicon.webp" />
    </Head>
  );
};

export default Seo;
