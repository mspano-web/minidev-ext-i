import Head from "next/head";
import MainBar from "./MainBar";
import NavigationBar from "./NavigationBar";

const Layout = (props: any) => {
  return (
    <div>
      <Head>
        <title> MiniDev Next.js</title>
      </Head>
      <MainBar></MainBar>
      <NavigationBar></NavigationBar>
      <div>{props.children}</div>
    </div>
  );
};

export default Layout;
