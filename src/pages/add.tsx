import { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'

const Add: NextPage = () => {
  const [newRestaurant, setNewRestaurant] = useState()

  return (
    <div className="max-w-6xl mx-auto mt-10 border border-gray-200 shadow-md">
      <Link href="/">Back</Link>

      <h1>Add Restaurant</h1>

      <form>
        <input type="text" />
      </form>
    </div>
  )
}

export default Add
