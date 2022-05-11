import type { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    Router.push("/dashboards/DashBoards", undefined, { shallow: true });
  }, []);

  return (
    <div>
      <Head>
        <title>MiniDev Next.js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  );
};

export default Home;
