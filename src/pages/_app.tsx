import type { AppProps } from 'next/app'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { getAlgoliaSearchClient } from '~/lib/algolia'
import '~/styles/globals.css'

const ALGOLIA_INDEX_NAME = 'restaurants'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <InstantSearch searchClient={getAlgoliaSearchClient()} indexName={ALGOLIA_INDEX_NAME}>
      <Component {...pageProps} />
    </InstantSearch>
  )
}

export default MyApp
