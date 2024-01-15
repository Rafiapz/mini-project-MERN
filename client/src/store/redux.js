import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { thunk } from "redux-thunk";

const initialForm = {
  username: "",
  email: "",
  password: "",
  profilePhotoUrl: "",
  profilePhoto: null
};

const initialState = {
  userAuth: {
    auth:false,
    userId:''
  },
  adminAuth: {
    auth:false,
  },
  userData: {},
  userForm: initialForm,
  usersList:[]
};

//admin reducers

export const adminAuthRecucer=(state=initialState.adminAuth,action)=>{

  switch (action.type) {
    case 'adminAuthenticated':
      return{
        ...state,
        auth:true
      }
    case 'adminNotAuthenticated':
      return{
        ...state,
        auth:false
      }  
    case 'loginAdmin':
      return{
        ...state,
        auth:true
      }  
    case 'logoutAdmin':
      return{
        ...state,
        auth:false
      }  
  
    default:
      return state
  }
}

export const usersListReducer = (state = initialState.usersList, action) => {
  switch (action.type) {
    case 'loadAllUsers':
     return action.payload.usersList.map((user)=>{
        return{
          username:user.username,
          email:user.email,
          profilePhoto:user.profilePhoto,
          _id:user._id
        }
      })
     
    default:
      return state;
  }
};


// user reducers

export const userAuthRecucer = (state = initialState.userAuth, action) => {
  switch (action.type) {
    case "authenticated":
      return {
        ...state, 
          auth:true,
          userId:action.payload.userId
        }
    case "notAuthenticated":
      return {
        ...state,
        auth:false,
        userId:''
      }
    case "logout":
      return {
        ...state,
        auth:false,
        userId:''
      }
    case "login":
      return {
        ...state,
        auth:true
      }
    case 'signup':
      return {
        ...state,
        auth:true,
        userId:action.payload.userId
      }
    default:
      return state;
  }
};


export const userFormReducer = (state = initialState.userForm, action) => {

  switch (action.type) {
    case 'setSignupFormUsername':
      return {
        ...state,
        username: action.payload.value
      }
    case 'setSignupFormEmail':
      return {
        ...state,
        email: action.payload.value
      }
    case 'setSignupPassword':
      return {
        ...state,
        password: action.payload.value
      }
    case 'setPhoto':
      return {
        ...state,
        profilePhotoUrl: action.payload.url
      }
    case 'loadData':
      return{
        ...state,
        username:action.payload.username,
        email:action.payload.email,
        password:action.payload.password,
        profilePhoto:action.payload.profilePhoto
      }  
    case 'unLoadData':
      return{
        ...state,
        username:'',
        email:'',
        password:'',
        profilePhoto:''
      }  

    default:
      return state;
  }
}

export const userDataReducer = (state = initialState.userData, action) => {

  switch (action.type) {
    case 'setUserData':
          return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      image: action.payload.image,

    }
    case 'unSetuserData':
      return{
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        image: action.payload.image,
  
      }  
  
    default:
      return state
  }

}


// user action creaters

export const signup = (userId) => {
  return {
    type: 'signup',
    payload:{
      userId
    }
  }
}

export const setuserData = ({ userData }) => {
  return {
    type: 'setUserData',
    payload: {
      username: userData?.username,
      email: userData?.email,
      image: userData?.profilePhoto
    }
  }
}
export const loadData=(userData)=>{
  return{
    type:'loadData',
    payload:{
      username:userData?.username,
      email:userData?.email,
      password:'',
      profilePhoto:userData?.profilePhoto
    }
  }
}
export const unSetuserData=()=>{
  return{
    type:'unSetuserData',
    payload:{
      username: '',
      email: '',
      image:''
    }
  }
}

export const unMountProfileData=()=>{
  return{
    type:'unLoadData',
    payload:{
      username:'',
      email:'',
      password:'',
      profilePhoto:''
    }
  }
}

export const setUserForm = (event) => {
  if (event.target.name === 'username') {
    return {
      type: 'setSignupFormUsername',
      payload: {
        value: event.target.value
      }
    }
  } else if (event.target.name === 'email') {
    return {
      type: 'setSignupFormEmail',
      payload: {
        value: event.target.value
      }
    }
  } else if (event.target.name === 'password') {
    return {
      type: 'setSignupPassword',
      payload: {
        value: event.target.value
      }
    }
  }

}

export const setProfilePhotoUrl = (url) => {
  return {
    type: 'setPhoto',
    payload: {
      url:url
    }
  }
}

export const login = () => {
  return {
    type: "login",
  };
};

export const logout = () => {
  return {
    type: "logout",
  };
};

const rootReducer = combineReducers({
  userAuth: userAuthRecucer,
  adminAuth: adminAuthRecucer,
  userData: userDataReducer,
  userForm: userFormReducer,
  usersList:usersListReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
