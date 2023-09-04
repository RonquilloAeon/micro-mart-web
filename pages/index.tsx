import React from "react";
import { renderToString } from 'react-dom/server';
import { Hits, InstantSearch, InstantSearchSSRProvider, SearchBox, getServerState } from 'react-instantsearch';
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

import Hit from "../components/Hit";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "mmdevelopment",
    nodes: [
      {
        host: "localhost",
        port: 8108,
        path: "",
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  additionalSearchParameters: {
    query_by: "name,description,categories",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

const Home = ({ serverState }) => (
  <InstantSearchSSRProvider {...serverState}>
    <InstantSearch indexName="products" searchClient={searchClient}>
        <div className="flex">
            <aside className="w-1/3 h-screen">
                <p>Coming soon...</p>
            </aside>
            <main>
                <SearchBox />
                <Hits hitComponent={Hit} />
            </main>
        </div>
    </InstantSearch>
  </InstantSearchSSRProvider>
);

export default Home;

export async function getServerSideProps({ req, res }) {
  res.setHeader("Cache-Control", `s-maxage=${1 * 60 * 60}, stale-while-revalidate=${24 * 60 * 60}`);

  const serverState = await getServerState(
    <Home />,
    { renderToString }
  );

  return {
    props: {
        serverState,
    }
  }
}