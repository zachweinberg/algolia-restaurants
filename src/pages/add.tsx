import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { addRestaurantToIndex } from '~/lib/algolia'
import { Restaurant } from '~/types'

const Add: NextPage = () => {
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const [newRestaurant, setNewRestaurant] = useState<Partial<Restaurant>>({
    name: '',
    rounded_stars_count: 5,
    area: '',
    price_range: '',
    food_type: '',
  })

  const onSaveRestaurant = async (e) => {
    e.preventDefault()
    try {
      setSaving(true)
      await addRestaurantToIndex(newRestaurant)
      router.push('/')
    } catch (e) {
      console.error(e)
      alert('Could not create restaurant in Algolia index.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto lg:border lg:border-gray-200 lg:mt-10 lg:max-w-6xl">
      <form className="p-10 mx-auto lg:w-1/2" onSubmit={onSaveRestaurant}>
        <Link href="/">
          <a className="text-sm text-blue-500">Back</a>
        </Link>

        <h1 className="mb-4 text-2xl font-bold ">Add Restaurant</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Restaurant Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                value={newRestaurant.name}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, name: e.target.value })
                }
                required
                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Restaurant Name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <div className="mt-1">
              <input
                value={newRestaurant.area}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, area: e.target.value })
                }
                type="text"
                required
                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Area"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Food Type</label>
            <div className="mt-1">
              <input
                value={newRestaurant.food_type}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, food_type: e.target.value })
                }
                type="text"
                required
                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Food Type"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <div className="mt-1">
              <input
                value={newRestaurant.price_range}
                onChange={(e) =>
                  setNewRestaurant({ ...newRestaurant, price_range: e.target.value })
                }
                type="text"
                required
                className="block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Price Range"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <select
              value={newRestaurant.rounded_stars_count}
              onChange={(e) =>
                setNewRestaurant({
                  ...newRestaurant,
                  rounded_stars_count: parseInt(e.target.value),
                })
              }
              className="block w-full p-3 mt-1 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={5}>5 stars</option>
              <option value={4}>4 stars</option>
              <option value={3}>3 stars</option>
              <option value={2}>2 stars</option>
              <option value={1}>1 stars</option>
            </select>
          </div>
        </div>

        <button
          disabled={saving}
          className="p-3 mt-6 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          {saving ? 'Saving...' : 'Save Restaurant'}
        </button>
      </form>
    </div>
  )
}

export default Add
