import axios from "axios";
import { login, setuserData, signup } from "../store/redux";

export const userAuthentication = () => {
    return (dispatch) => {
        axios
            .get("/auth")
            .then((res) => {
                if (res.data.auth) {
                    dispatch({
                        type: "authenticated",
                    });
                    dispatch(setuserData(res.data))
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
        axios.post('/loginSubmit', loginForm)
            .then((res) => {
                if (res.data.auth) {
                    localStorage.setItem('userToken', res.data.token)
                    dispatch(setuserData(res.data))
                    dispatch(login())
                    
                } else {
                    alert('invalid email or password')
                }
            }).catch(err=>{
                console.log(err);
            })
    }

}

export const userSignup = ({ image, username, email, password }) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    return (dispatch) => {
        axios
            .post("signupSubmit", formData)
            .then((res) => {
                localStorage.setItem("userToken", res.data.token);
                dispatch(signup())
                dispatch(setuserData(res.data))
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
