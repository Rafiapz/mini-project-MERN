import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DeleteModal from '../CostomeModals/DeleteModal'
import { deleteUser } from '../../api/apiServies'

function Card({usersList,setDisplayUsers}) {

        const navigate=useNavigate()
        const [open, setOpen] = useState(false);
        const [curId,setCurId]=useState('') 
        const dispatch=useDispatch()

        const handleDelete=(id)=>{
            dispatch(deleteUser(id,setOpen,setDisplayUsers))
        }

    return (
        <>
            {usersList&&usersList.map((user,i) => (
                
                <div key={user._id}  className="bg-white shadow-md p-4 max-w-2xl mx-auto flex items-center">
                   <div className="flex-shrink-0">
                        <img
                            src={`http://localhost:3100/uploads/${user.profilePhoto}`}
                            alt="Profile"
                            className="w-16 h-16 rounded-full"
                        />
                    </div>
                    <div className="ml-4 flex-grow flex justify-between">
                        <div className="mb-2">
                            <h2 className="text-lg font-semibold">{user.username}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <div className="flex items-center">
                            <button className="bg-blue-950 text-white px-4 py-1 mr-2 rounded-md h-8" 
                            onClick={()=>navigate(`/admin/edit-userByAdmin/${user._id}`)} >
                                Edit
                            </button>
                            <button className="bg-yellow-300 text-black px-4 py-1 rounded-md h-8" 
                            onClick={()=>{
                                setOpen(true)
                                setCurId(user._id)
                                }} >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            <DeleteModal id={curId} open={open} handleDelete={handleDelete} setOpen={setOpen} />
        </>
    )
}

export default Card