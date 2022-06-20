import classNames from 'classnames'
import { useMemo } from 'react'
import { useCurrentRefinements, useRefinementList } from 'react-instantsearch-hooks-web'

interface Props {
  foodTypes: { [foodType: string]: number }
}

const FoodTypeFilter: React.FunctionComponent<Props> = ({ foodTypes }: Props) => {
  const { refine } = useRefinementList({ attribute: 'food_type' })
  const { items: currentRefinementItems, refine: refineCurrent } = useCurrentRefinements()

  // Create map of all currently refined food types
  const currentFoodTypesSelected = useMemo(() => {
    return currentRefinementItems.reduce((map, item) => {
      const values = item.refinements.map((refinement) => refinement.value)
      values.forEach((val) => (map[val] = true))
      return map
    }, {})
  }, [currentRefinementItems])

  return (
    <aside className="py-6 h-[35rem] overflow-auto p-6 w-1/4 sticky top-0 border-r border-gray-200">
      {/* TODO: Make sticky */}
      <p className="mb-4 font-medium">
        Cuisine Type{' '}
        {Object.keys(currentFoodTypesSelected).length > 0 &&
          `(${Object.keys(currentFoodTypesSelected).length})`}
      </p>

      <ul className="pl-2 space-y-2">
        {Object.keys(foodTypes).map((type) => (
          <li
            key={type}
            onClick={() => {
              if (currentFoodTypesSelected[type]) {
                refineCurrent({
                  value: type,
                  label: type,
                  type: 'disjunctive',
                  attribute: 'food_type',
                })
              } else {
                refine(type)
              }
            }}
            className={classNames(
              currentFoodTypesSelected[type]
                ? 'text-white bg-gray-500'
                : 'text-gray-600 hover:text-white hover:bg-gray-500',
              'flex text-sm items-start justify-between px-2 py-1 transition-all font-light rounded-md cursor-pointer'
            )}
          >
            <p>{type}</p>
            <p>{foodTypes[type]}</p>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default FoodTypeFilter
