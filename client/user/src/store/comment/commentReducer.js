import { COMMENT_REQ, COMMENT_SUCCESS, COMMENT_FAILED } from './commentTypes';


const intialState = {

}

const commentReducer = (state= intialState, action) => {
        switch (action.type) {
            case COMMENT_REQ:
                return {
                    loading: true
                }
                case COMMENT_SUCCESS:
                    return {
                        loading: false,
                        message: action.message,
                        status: action.status
                    }
                case COMMENT_FAILED:
                    return {
                        loading: false,
                        message: action.message,
                        status: action.status
                    }
            default:
                return {
                    ...state,
                }
        }
}

export default commentReducer;