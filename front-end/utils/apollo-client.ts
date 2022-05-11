import { ApolloClient, InMemoryCache } from "@apollo/client";

import getConfig from 'next/config';
const  nextConfig = getConfig();
const API_URI = process.env.DOCKER === "true" ? (nextConfig.serverRuntimeConfig.URI || nextConfig.publicRuntimeConfig.URI):nextConfig.publicRuntimeConfig.URI;

const apolloClient = new ApolloClient({
  //uri: "http://localhost:4000/graphql",// In docker only works with client-side (useMutation, useQuery)
  //uri: "http://back-end:4000/graphql", // In docker only works with server-side (getServerStaticProps) 
  // Solution for docker: see file next.config.js
  uri: `${API_URI}/graphql`,
  cache: new InMemoryCache(), // The cache that Apollo Client should use to store query results locally.
  ssrMode: true, // When using Apollo Client for server-side rendering, set this to true so that the getDataFromTree function can work effectively.
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache', // To Test refetch data
      //fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",
    },
    query: {
              fetchPolicy: 'no-cache', // Test refetch data
      //fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  },
});
export default apolloClient;
