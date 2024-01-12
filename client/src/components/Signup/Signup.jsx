import "./Signup.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../api/apiServies";
import { setProfilePhotoUrl, setUserForm } from "../../store/redux";

function Signup() {


    // const initialSignupForm = {
    //     username: "",
    //     email: "",
    //     password: "",
    //     profilePhotoUrl: "",
    //     profilePhoto: null
    // };

    const userForm=useSelector(state=>state.userForm)
    
    const navigate = useNavigate()
    const dispatch=useDispatch()

    // const [signupForm, setSignupForm] = useState(initialSignupForm);

    const handleSignupForm = (event) => {

        dispatch(setUserForm(event))

        // setSignupForm((prev) => {
        //     return {
        //         ...prev,
        //         [event.target.name]: event.target.value
        //     }
        // })
    };

    const handleProfilePhoto = (event) => {
        const url = URL.createObjectURL(event.target.files[0])
        setImage(event.target.files[0])
        dispatch(setProfilePhotoUrl(url))
        // setSignupForm((prev) => {
        //     return {
        //         ...prev,
        //         profilePhotoUrl: url,

        //     }
        // })
    }

    const [image, setImage] = useState()

    const handleSubmission = () => {
        dispatch(userSignup({...userForm,image}))
        navigate('/')
       
    };



    return (
        <div className="max-w-md mx-auto p-6 bg-slate-300 rounded-md shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            <form>
                <label className="block mb-4">
                    Username:
                    <input
                        type="text"
                        name="username"
                        className="mt-1 p-2 border rounded w-full"
                        value={userForm.username}
                        onChange={handleSignupForm}
                        autoComplete=""
                    />
                </label>
                <label className="block mb-4">
                    Email:
                    <input
                        type="email"
                        name="email"
                        className="mt-1 p-2 border rounded w-full"
                        value={userForm.email}
                        onChange={handleSignupForm}
                        autoComplete=""
                    />
                </label>
                <label className="block mb-4">
                    Password:
                    <input
                        type="password"
                        name="password"
                        className="mt-1 p-2 border rounded w-full"
                        value={userForm.password}
                        onChange={handleSignupForm}
                        autoComplete=""
                    />
                </label>
                <label className="block mb-4">
                    Profile Photo:
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-1 p-2 border rounded w-full"
                        onChange={handleProfilePhoto}

                    />
                </label>
                <div className="mb-4">
                    <p className="text-sm font-semibold">Image Preview:</p>
                    <img
                        src={userForm.profilePhotoUrl}
                        alt="Profile Preview"
                        className="mt-2 max-w-full w-16 h-16"
                    />
                </div>
                <button
                    type="button"
                    className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer"
                    onClick={handleSubmission}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );

}

export default Signup;
