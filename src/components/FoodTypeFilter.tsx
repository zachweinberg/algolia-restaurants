import classNames from 'classnames'
import { useMemo } from 'react'
import { useCurrentRefinements, useRefinementList } from 'react-instantsearch-hooks-web'
import { FoodTypeMap } from '~/types'

interface Props {
  foodTypes: FoodTypeMap
}

const FoodTypeFilter: React.FunctionComponent<Props> = ({ foodTypes }: Props) => {
  const { refine } = useRefinementList({ attribute: 'food_type' })
  const { items: currentRefinementItems, refine: refineCurrent } = useCurrentRefinements()

  // Create map of all currently refined food types
  const currentFoodTypesSelected = useMemo(
    () =>
      currentRefinementItems.reduce((map, item) => {
        const values = item.refinements.map((refinement) => refinement.value)
        values.forEach((val) => (map[val] = true))
        return map
      }, {}),
    [currentRefinementItems]
  )

  return (
    <aside className="lg:h-[35rem] overflow-auto lg:p-6 lg:w-1/4 sticky top-0 border-r border-gray-200">
      {/* TODO: Make sticky */}
      <p className="hidden mb-4 font-medium lg:block">
        Cuisine Type{' '}
        {Object.keys(currentFoodTypesSelected).length > 0 &&
          `(${Object.keys(currentFoodTypesSelected).length})`}
      </p>

      <ul className="flex items-center pl-2 space-x-2 lg:space-x-0 lg:space-y-2 lg:block">
        {Object.keys(foodTypes).map((foodType) => (
          <li
            key={foodType}
            onClick={() => {
              if (currentFoodTypesSelected[foodType]) {
                refineCurrent({
                  value: foodType,
                  label: foodType,
                  type: 'disjunctive',
                  attribute: 'food_type',
                })
              } else {
                refine(foodType)
              }
            }}
            className={classNames(
              currentFoodTypesSelected[foodType]
                ? 'text-white bg-gray-500'
                : 'text-gray-600 hover:text-white hover:bg-gray-500',
              'my-5 lg:my-0 whitespace-nowrap lg:whitespace-normal flex text-sm items-start justify-between px-2 py-1 transition-all font-light rounded-md cursor-pointer'
            )}
          >
            <p>{foodType}</p>
            <p className="hidden lg:block">{foodTypes[foodType]}</p>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default FoodTypeFilter
