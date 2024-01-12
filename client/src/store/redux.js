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
  userAuth: false,
  adminAuth: false,
  userData: {},
  userForm: initialForm
};

const userAuthRecucer = (state = initialState.userAuth, action) => {
  switch (action.type) {
    case "authenticated":
      return (state = true);
    case "notAuthenticated":
      return (state = false);
    case "logout":
      return (state = false);
    case "login":
      return (state = true);
    case 'signup':
      return (state = true)
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

    default:
      return state;
  }
}

export const userDataReducer = (state = initialState.userData, action) => {

  if (action.type === 'setUserData') {
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      image: action.payload.image,

    }
  }
  return state
}




const adminAuthRecucer = (state = initialState.userAuth, action) => {
  return {};
};


export const signup = () => {
  return {
    type: 'signup'
  }
}

export const setuserData = ({ userData }) => {

  return {
    type: 'setUserData',
    payload: {
      username: userData.username,
      email: userData.email,
      image: userData.profilePhoto
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
      url
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
  userForm: userFormReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
