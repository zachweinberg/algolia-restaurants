import { InfiniteHits } from 'react-instantsearch-hooks-web'
import { Restaurant } from '~/types'
import StarRatingRow from './StarRatingRow'

interface Props {
  onDelete: () => void
}

const RestaurantCard = ({ hit, onDelete }) => {
  const restaurant = hit as Restaurant

  if (!restaurant) {
    return null
  }

  return (
    <div className="flex mb-6">
      <img className="w-24 h-24 rounded-sm" src={restaurant.image_url} />
      <div className="flex items-end justify-between w-full ml-4">
        <div>
          <p className="text-lg font-semibold">{restaurant.name}</p>

          <StarRatingRow numStars={restaurant.rounded_stars_count ?? 0} />

          {restaurant.food_type && (
            <p className="mt-1 text-gray-500">{restaurant.food_type}</p>
          )}

          {restaurant.area && (
            <p className="mt-1 text-gray-500">
              {restaurant.area} - {restaurant.price_range}
            </p>
          )}
        </div>

        <button
          onClick={() => onDelete(restaurant.objectID)}
          className="p-2 text-xs text-white bg-red-500 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

const SearchResults: React.FunctionComponent<Props> = ({ onDelete }: Props) => {
  return (
    <div className="p-6 h-[35rem] overflow-auto w-full">
      <InfiniteHits
        showPrevious={false}
        hitComponent={(p) => <RestaurantCard onDelete={onDelete} {...p} />}
      />
    </div>
  )
}

export default SearchResults
