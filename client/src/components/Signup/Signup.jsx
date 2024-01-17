import "./Signup.css";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    mountProfileData,
    mountUserDetails,
    userRegisterOrUpdate,
} from "../../api/apiServies";
import {
    setProfilePhotoUrl,
    setUserForm,
    unMountProfileData,
} from "../../store/redux";

function Signup() {
    const userForm = useSelector((state) => state.userForm);
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const userAuthId = useSelector((state) => state.userAuthId);
    const { id } = useParams();
    const [action, setAction] = useState("Create");
    const [error,setError]=useState({})

    const path = pathname.split("/").at(2);

    useEffect(() => {
        if (pathname === "/profile") {
            setAction("Update");
            dispatch(mountProfileData());
        } else if (path === "edit-userByAdmin") {
            setAction("Update");
            dispatch(mountUserDetails(id));
        }
        return () => {
            dispatch(unMountProfileData());
            dispatch(setProfilePhotoUrl(null));
        };
    }, []);

    const handleSignupForm = (event) => {
        dispatch(setUserForm(event));
    };

    const handleProfilePhoto = (event) => {
        const url = URL.createObjectURL(event.target.files[0]);
        setImage(event.target.files[0]);
        dispatch(setProfilePhotoUrl(url));
    };

    const validate=(form)=>{
        
        if(form.username.trim()===''){
            setError((prev)=>{
                return{
                    ...prev,
                    username:'This field is required'
                }
            })            
            return false        
        }else if(form.email.trim()===''){
            setError((prev)=>{
                return{
                    ...prev,
                    username:'',
                    email:'This field is required'
                }
            })            
            return false
        }else if(!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(form.email)){
            setError((prev)=>{
                return{
                    ...prev,
                    username:'',
                    email:'Please enter a valid email '
                }
            })            
            return false
        
        }else if (form.password.trim() === '') {
            console.log('');
            setError((prev) => ({
                ...prev,
                username: '',
                email: '',
                password: 'This field is required',
            }));
            return false;
        } else if (form.password.trim().length < 4) {
            setError((prev) => ({
                ...prev,
                username: '',
                email: '',
                password: 'Password should have a minimum of 4 characters',
            }));
            return false;
        }else if(form.profilePhotoUrl==null && pathname==='/signup' || pathname==='/admin/create-user' && form.profilePhotoUrl==null ){
            setError((prev) => ({
                ...prev,
                username: '',
                email: '',
                password: '',
                profilePhoto:'This field is required'
            }));
            return false;
        }

        return true
    }

    const handleSubmission = () => {
        if(!validate(userForm)){
            return
        }else{
            setError((prev)=>({
                ...prev,
                username:'',
                email:'',
                password:'',
                profilePhoto:''
            }))
        }

        if (pathname === "/signup") {
            dispatch(
                userRegisterOrUpdate({ ...userForm, image, need: "signup" }, navigate)
            );
        } else if (pathname === "/profile") {
            dispatch(
                userRegisterOrUpdate(
                    { ...userForm, image, need: "edit", id: userAuthId },
                    navigate
                )
            );
        } else if (path === "edit-userByAdmin") {
            dispatch(
                userRegisterOrUpdate(
                    { ...userForm, image, need: "edit-by-admin", id },
                    navigate
                )
            );
        } else if (pathname === "/admin/create-user") {
            dispatch(
                userRegisterOrUpdate(
                    { ...userForm, image, need: "createUser" },
                    navigate
                )
            );
        }
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
                    {error?.username&&<span className="text-red-600" >{error.username}</span>}
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
                    {error?.email&&<span className="text-red-600" >{error.email}</span>}
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
                    {error?.password&&<span className="text-red-600" >{error.password}</span>}
                </label>
                <label className="block mb-4">
                    Profile Photo:
                    <input
                        type="file"
                        accept="image/*"
                        className="mt-1 p-2 border rounded w-full"
                        onChange={handleProfilePhoto}
                        required
                    />
                    {error?.profilePhoto&&<span className="text-red-600" >{error.profilePhoto}</span>}
                </label>
                <div className="mb-4">
                    <p className="text-sm font-semibold">Image Preview:</p>
                    <img
                        src={
                            userForm.profilePhotoUrl
                                ? userForm.profilePhotoUrl
                                : `http://localhost:3100/uploads/${userForm.profilePhoto}`
                        }
                        alt="Profile Preview"
                        className="mt-2 max-w-full w-16 h-16"
                    />
                </div>
                <div className="flex">
                    <button
                        type="button"
                        className="bg-emerald-800 text-white py-2 px-4 rounded cursor-pointer"
                        onClick={handleSubmission}
                    >
                        {action}
                    </button>
                    {pathname === "/signup" && (
                        <div className="mt-2 ml-4">
                            Already have an account
                            <Link to="/" className="text-blue-700">
                                {" "}
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Signup;
