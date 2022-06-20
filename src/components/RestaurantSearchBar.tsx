import { SearchBox } from 'react-instantsearch-hooks-web'

const RestaurantSearchBar: React.FunctionComponent = () => {
  return (
    <div className="p-6 bg-slate-500">
      <SearchBox
        resetIconComponent={() => null}
        loadingIconComponent={() => null}
        submitIconComponent={() => null}
        placeholder="Search our Restaurants - type in a name, location or cuisine!"
        classNames={{
          input:
            'w-full p-4 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1',
          reset: 'hidden',
        }}
      />
    </div>
  )
}

export default RestaurantSearchBar
