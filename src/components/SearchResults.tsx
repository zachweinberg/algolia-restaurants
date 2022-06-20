import { InfiniteHits } from 'react-instantsearch-hooks-web'
import { Restaurant } from '~/types'
import StarRatingRow from './StarRatingRow'

const RestaurantCard = (props) => {
  const restaurant = props.hit as Restaurant

  return (
    <div className="flex mb-6">
      <img className="w-24 h-24 rounded-sm" src={restaurant.image_url} />
      <div className="ml-4">
        <p className="font-semibold text-lg">{restaurant.name}</p>
        <StarRatingRow numStars={restaurant.stars_count} />
        {restaurant.food_type && <p className="text-gray-500">{restaurant.food_type}</p>}
        {restaurant.area && (
          <p className="text-gray-500">
            {restaurant.area} - {restaurant.price_range}
          </p>
        )}
      </div>
    </div>
  )
}

const SearchResults: React.FunctionComponent = () => {
  return (
    <div className="p-6 h-[35rem] overflow-auto w-full">
      <InfiniteHits showPrevious={false} hitComponent={RestaurantCard} />
    </div>
  )
}

export default SearchResults
