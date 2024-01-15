import axios from "axios";
import { loadData, login, setuserData, signup } from "../store/redux";
import  toast from 'react-hot-toast';

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
                } else {
                    alert("invalid email or password");
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
                })
                .catch((err) => {
                    console.log(err);
                });
        } else if (need === "edit") {
            axios
                .post(`/editProfile/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => {
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                });
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
            dispatch(loadData(res.data));
        });
    };
};


//admin

export const adminLogin = (form) => {

    return (dispatch) => {

        axios.post('/admin/adminLogin', form).then(res => {

            if(res.data.auth){
            dispatch({
                type:'adminAuthenticated'
            })                
            }else{
                dispatch({
                    type:'adminNotAuthenticated'
                })
                toast(res.data.message)
            }

        }).catch(err => {
            console.log(err);
        })
    }


}