import React from 'react'

function Checkbox() {
    return (
        <div className="absolute flex justify-center" style={{ marginTop: '28px', marginLeft: '300px' }}>
            <input type="checkbox" id="myCheckbox" className="mr-2 w-6 h-6" />
            <label className='text-white text-lg' htmlFor="myCheckbox">All users</label>
        </div>
    )
}

export default Checkbox