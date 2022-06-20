import classNames from 'classnames'
import { Hits } from 'react-instantsearch-hooks-web'
import { Restaurant } from '~/types'
import StarRatingRow from './StarRatingRow'

const RestaurantCard = ({ hit, onClickDelete, isDeleting }) => {
  const restaurant = hit as Restaurant

  if (!restaurant) {
    return null
  }

  return (
    <div className="flex py-6 border-b border-gray-100">
      <img
        className="w-24 h-24 rounded-sm"
        src={restaurant.image_url}
        alt="restaurant image"
      />
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

        <p
          onClick={() => {
            if (!isDeleting) {
              onClickDelete(restaurant.objectID)
            }
          }}
          className={classNames(
            isDeleting && 'opacity-40',
            'p-2 text-xs text-red-500 rounded-md cursor-pointer hover:text-red-400'
          )}
        >
          Delete
        </p>
      </div>
    </div>
  )
}

interface Props {
  onClickDelete: (objectID: string) => void
  isDeleting: boolean
}

const SearchResults: React.FunctionComponent<Props> = ({
  onClickDelete,
  isDeleting,
}: Props) => {
  return (
    <div className="p-6 h-[35rem] overflow-auto w-full">
      <Hits
        hitComponent={(props) => (
          <RestaurantCard
            {...props}
            onClickDelete={onClickDelete}
            isDeleting={isDeleting}
          />
        )}
      />
    </div>
  )
}

export default SearchResults
