import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  VERIFICATION_REQUEST,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAILED,
  LOGOUT,
  DESTROY_MESSAGE,
} from "./authType";
const initialState = {
  verifying: false,
  isLoading: false,
  isLoggedIn: false,
  userData: [],
  message: "",
  fakeToken: false,
  status: 0,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        isLoading: true,

      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        message: action.payload,
        status: 200,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        status: 409,
      };
    case VERIFICATION_REQUEST:
      return {
        ...state,
        verifying: true,
      };

    case VERIFICATION_SUCCESS:
      return {
        ...state,
        verifying: false,
        isLoggedIn: true,
        userData: action.payload,
        status: 200,
      };

    case VERIFICATION_FAILED:
      return {
        isLoggedIn: false,
        verifying: false,
        message: action.payload,
        fakeToken: true,
        status: 409,
      };
      case LOGOUT: {
        return {
          ...state,
          isLoggedIn: false,
        }
      }
      case DESTROY_MESSAGE: {
        return {
          ...state,
          message : '' ,
        }
      }
    default:
      return {
        ...state,
      };
  }
};
export default authReducer;
