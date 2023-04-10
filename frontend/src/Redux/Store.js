import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  username: "",
  email: "",
  phone: "",
  plan:"",
  isBlocked:""
}

const store = configureStore({
  reducer: (state = initialState,action) => {
    switch (action.type) {
      case "StoreUser":
        return {
          ...state,
          fullname: action.fullname,
          username: action.username,
          email: action.email,
          phone:action.phone,
          plan:action.plan,
          isBloked:action.isBlocked
        };
      case "RemoveUser":
        return {
          ...state,
          fullname: "",
          username: "",
          email: "",
          phone:"",
          plan:"",
          isBlocked:""
        };
        case "StorePlan":
        return {
          ...state,
          plan:action.plan,
          
        };
        default:
          return state;
      }
    }
  })

  export default store