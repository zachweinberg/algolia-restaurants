import Link from 'next/link'
import { SearchBox } from 'react-instantsearch-hooks-web'

const RestaurantSearchBar: React.FunctionComponent = () => {
  return (
    <div className="flex justify-between p-6 bg-slate-500">
      <SearchBox
        resetIconComponent={() => null}
        loadingIconComponent={() => null}
        submitIconComponent={() => null}
        placeholder="Search our Restaurants - type in a name, location or cuisine!"
        classNames={{
          root: 'mr-3 flex-1',
          input:
            'w-full p-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
          reset: 'hidden',
        }}
      />
      <Link href="/add">
        <button className="px-4 py-3 font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200">
          Add Restaurant +
        </button>
      </Link>
    </div>
  )
}

export default RestaurantSearchBar
