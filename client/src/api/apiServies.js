import axios from "axios";
import { loadData, login, setuserData, signup } from "../store/redux";
import toast from 'react-hot-toast';

export const userAuthentication = () => {
    return (dispatch) => {
        axios
            .get("/auth")
            .then((res) => {
                if (res.data.auth) {
                    dispatch({
                        type: "authenticated",
                        payload: {
                            userId: res.data.userId,
                        },
                    });
                    dispatch(setuserData(res.data));
                } else {
                    if (res.data.message == "tokenExpired") {
                        localStorage.removeItem("userToken");
                    }
                    dispatch({
                        type: "notAuthenticated",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                toast('Network error')
            });
    };
};

export const userLogin = (loginForm) => {
    return (dispatch) => {
        axios
            .post("/loginSubmit", loginForm)
            .then((res) => {
                if (res.data.auth) {
                    localStorage.setItem("userToken", res.data.token);
                    dispatch(login());
                    dispatch(setuserData(res.data));
                } else {
                    toast("invalid email or password");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const userRegisterOrUpdate = (
    { image, username, email, password, id, need },
    navigate
) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    return (dispatch) => {
        if (need === "signup") {
            axios
                .post("signupSubmit", formData)
                .then((res) => {
                    localStorage.setItem("userToken", res.data.token);
                    dispatch(signup(res.data.userId));
                    navigate('/')
                    toast('Successfully submitted')
                })
                .catch((err) => {
                    console.log(err);
                    toast('Network error')
                });
        } else if (need === "edit") {
            axios
                .post(`/editProfile/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    navigate("/");
                    toast('Successfully edited')
                })
                .catch((err) => {
                    console.log(err);
                    toast('Somthing went wrong')
                });
        } else if (need ==='edit-by-admin') {
            axios
                .post(`/admin/edituser/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    navigate("/admin");
                    toast('Successfully edited')
                })
                .catch((err) => {
                    console.log(err);
                    toast('Somthing went wrong')
                });
        }else if(need==='createUser'){
            console.log('hjhj');
            axios.post('/admin/createUser',formData).then(res=>{
               if(res.data.created){
                navigate('/admin')
                toast('Successfully created')
               }else{
                navigate('/admin')
                toast("Couldn't create user")
               }
            }).catch(err=>{
                console.log(err);
                toast('Somthing went wrong')
            })
        }
    };
};

export const mountUserData = () => {
    return (dispatch) => {
        axios
            .get("/userData")
            .then((res) => {
                dispatch(setuserData(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export const mountProfileData = () => {
    return (dispatch) => {
        axios.get("/userData").then((res) => {
            dispatch(loadData(res.data.userData));
        });
    };
};



//admin

export const adminLogin = (form) => {

    return (dispatch) => {

        axios.post('/admin/adminLogin', form).then(res => {

            if (res.data.auth) {
                localStorage.setItem("adminToken", res.data.token);
                dispatch({
                    type: 'loginAdmin'
                })

            } else {
                dispatch({
                    type: 'adminNotAuthenticated'
                })
                toast(res.data.message)
            }

        }).catch(err => {
            console.log(err);
        })
    }

}

export const adminAuthentication = () => {
    return (dispatch) => {
        axios
            .get("/admin/auth")
            .then((res) => {
                if (res.data.auth) {
                    dispatch({
                        type: 'adminAuthenticated'
                    })
                } else {
                    if (res.data.message == "tokenExpired") {
                        localStorage.removeItem("adminToken");
                    }
                    dispatch({
                        type: "adminNotAuthenticated",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                toast("Network error")
            });
    };
};

export const loadAllusers = (setDisplayUser) => {
    return (dispatch) => {
        axios.get('/admin/allusers').then(res => {
            dispatch({
                type: 'loadAllUsers',
                payload: {
                    usersList: res.data.usersList
                }
            })
            setDisplayUser(res.data.usersList)

        }).catch(err => {
            console.log(err);
        })
    }
}

export const mountUserDetails = (id) => {
    return (dispatch) => {
        axios.get(`/admin/user-details?user=${id}`).then(res => {
            dispatch(loadData(res.data.details))
        }).catch(err => {
            console.log(err);
        })
    }
}

export const deleteUser=(id,setOpen,setDisplayUser)=>{
    return(dispatch)=>{
        axios.delete(`/admin/delete-user/${id}`).then(res=>{
            if(res.data.deleted){
                dispatch(loadAllusers(setDisplayUser))     
                toast('Succefully deleted')           
            }
            setOpen(false)
        }).catch(err=>{
            console.log(err);
        })
    }
}


