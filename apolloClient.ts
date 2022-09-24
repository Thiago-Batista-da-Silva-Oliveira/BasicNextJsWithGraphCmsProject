import { ApolloClient, InMemoryCache } from "@apollo/client";

 const client = new ApolloClient({
    uri: 'https://api-sa-east-1.hygraph.com/v2/cl8ed6oqm2iti01tcbz176y4l/master',
    cache: new InMemoryCache(),
  });

  export default client