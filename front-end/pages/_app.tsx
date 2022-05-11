import "../styles/globals.scss";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/apollo-client";

function MyApp({ Component, pageProps }: AppProps) {

  return (
   // https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/
    <ApolloProvider client={apolloClient}>  
      <Component {...pageProps} />
    </ApolloProvider>
  );
} 
 
export default MyApp;
