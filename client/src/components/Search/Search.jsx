import React from 'react'

function Search() {
  return (
    <div className="container mx-auto p-4">
    <div className="flex">
        <input
            className="p-2 border rounded-l focus:outline-none"
            type="text"
            placeholder="Search..."
        />
        <button className="bg-blue-500 text-white p-2 rounded-r">
            Search
        </button>
    </div>
</div>
  )
}

export default Search