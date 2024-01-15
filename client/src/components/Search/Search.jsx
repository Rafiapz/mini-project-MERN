import React, { useState } from 'react'
import { useDispatch } from 'react-redux'


function Search({handleSearch}) {

    const [search, setSearch] = useState('')
    const dispatch=useDispatch()

    const handleChange=(event)=>{
      setSearch(event.target.value)
    }

    const handleSubmit=()=>{
      handleSearch(search)
    }

  return (
    <div className="container mx-auto p-4 flex justify-center">
    <div className="flex">
        <input
            className="p-2 border w-80 rounded-l focus:outline-none"
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            value={search}
        />
        <button onClick={handleSubmit} className="bg-slate-500 text-white p-2 rounded-r">
            Search
        </button>
    </div>
</div>
  )
}

export default Search