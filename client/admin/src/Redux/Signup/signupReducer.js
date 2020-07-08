import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  CHECK_USERNAME,
  VALID_USERNAME,
  INVALID_USERNAME,
  DESTROY_MESSAGE
} from "./signupTypes";


const intialState = {
  isLoading: false,
  message: "",
  status: 0,
  checkingUsername: null,
  validUsername: null,
  username: '',
  email: '',
};

const signupReducer = (state = intialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case SIGNUP_SUCCESS:
      return {
        isLoading: false,
        message: action.payload,
        status: 200,
      };
    case SIGNUP_FAILED:
      return {
        isLoading: false,
        message: action.payload,
        status: 400,
        email: action.email,
      };
    case CHECK_USERNAME:
      return {
        checkingUsername: true,
      };
    case VALID_USERNAME:
      return {
        checkingUsername: false,
        message: action.payload,
        status: 200,
        validUsername: true,
        username: action.username,
      };
    case INVALID_USERNAME:
      return {
        checkingUsername: false,
        message: action.payload,
        status: 400,
        validUsername: false,
      };
      case DESTROY_MESSAGE:
      return {
      }
    default:
      return {
        ...state,
      };
  }
};

export default signupReducer;
