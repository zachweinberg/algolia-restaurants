import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import { useCurrentRefinements, useRefinementList } from 'react-instantsearch-hooks-web'
import Spinner from '~/components/Spinner'
import { getAllFoodTypes } from '~/lib/algolia'

const FoodTypeFilter: React.FunctionComponent = () => {
  const [allFoodTypes, setAllFoodTypes] = useState<{ [foodType: string]: number }>({})
  const [loading, setLoading] = useState<boolean>(true)
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

  const loadFoodTypes = async () => {
    try {
      const foodTypes = await getAllFoodTypes()
      setAllFoodTypes(foodTypes)
    } catch (e) {
      console.error(e)
      alert('Could not load all food types.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    loadFoodTypes()
  }, [])

  return (
    <aside className="py-6 h-[35rem] overflow-auto p-6 w-1/4 sticky top-0 border-r border-gray-200">
      {loading ? (
        <Spinner size={10} />
      ) : (
        <>
          {/* TODO: Make sticky */}
          <p className="mb-4 font-medium">
            Cuisine Type{' '}
            {Object.keys(currentFoodTypesSelected).length > 0 &&
              `(${Object.keys(currentFoodTypesSelected).length})`}
          </p>

          {/* 
            We could use the built in RefinementList component from InstantSearch below, but I chose to build my own
            to get experience with new InstantSearch Hooks
          */}
          <ul className="pl-2 space-y-2">
            {Object.keys(allFoodTypes).map((type) => (
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
                <p>{allFoodTypes[type]}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  )
}

export default FoodTypeFilter
