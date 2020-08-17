import { FETCH_VIDEO_REQ, FETCH_VIDEO_SUCCESS, FETCH_VIDEO_FAILED, FETCH_ID_REQ, FETCH_ID_SUCCESS, FETCH_ID_FAILED } from './videoTypes';

const initialState = {

}

const videoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VIDEO_REQ:
            return {
                loading: true
            }
        case FETCH_VIDEO_SUCCESS:
            return {
                loading: false,
                videoData: action.videos
            }
        case FETCH_VIDEO_FAILED:
            return {
                loading: false,
                message: action.message
            }
        case FETCH_ID_REQ:
            return {
                ...state,
                fetching: true
            }
        case FETCH_ID_SUCCESS:
            return {
                ...state,
                fetching: false,
                message: action.message,
                videoById: action.video
            }
        case FETCH_ID_FAILED:
            return {
                ...state,
                fetching: false,
                message: action.message,
                status: action.status
            }
        default:
           return {
                ...state
            }
    }
}

export default videoReducer;