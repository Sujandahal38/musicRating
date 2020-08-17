
import { FETCH_USER_FAILED, FETCH_USER_REQ, FETCH_USER_SEUCCESS } from './userType';

const initialState = {
    loading: false,
    userData: [],
    status: 0,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQ:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SEUCCESS:
            return {
                ...state,
                loading: false,
                userData: action.data,
                status: action.status
            }
        case FETCH_USER_FAILED:
            return {
                ...state,
                loading: false,
                message: action.message,
                status: action.status
            }
        default:
           return {
               ...state
           }
    }
}

export default userReducer;