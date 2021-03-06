import type { AppProps } from 'next/app'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import { searchClient } from '~/lib/algolia'
import '~/styles/globals.css'

const ALGOLIA_INDEX_NAME = 'restaurants'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <InstantSearch searchClient={searchClient} indexName={ALGOLIA_INDEX_NAME}>
      <Component {...pageProps} />
    </InstantSearch>
  )
}

export default App
