import {
  ADD_VIDOE_REQ,
  ADD_VIDEO_SUC,
  ADD_VIDEO_FAILED,
  FETCH_VIDEO_REQ,
  FETCH_VIDEO_SUC,
  FETCH_VIDEO_FAILED,
  VIDEO_ID_REQ,
  VIDEO_ID_SUC,
  VIDEO_ID_FAIL,
  FETCH_COMMENT_REQ,
  FETCH_COMMENT_SUC,
  FETCH_COMMENT_FAIL
} from './videoType';


const initialState = {
  loading: false,
  message: '',
  status: 0,
  videoDatabyId: [],
}

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_VIDOE_REQ:
      return {
        ...state,
        loading: true,
      }
      case ADD_VIDEO_SUC:
        return {
          loading: false,
            message: action.message,
        }
        case ADD_VIDEO_FAILED:
          return {
            ...state,
            loading: false,
              message: action.error,
          }
          case FETCH_VIDEO_REQ:
            return {
              fetching: true,
            }
            case FETCH_VIDEO_SUC:
              return {
                ...state,
                fetching: false,
                  videoData: action.payload,
                  message: action.message,
              }
              case FETCH_VIDEO_FAILED:
                return {
                  ...state,
                  fetching: false,
                    message: action.message,
                }
                case VIDEO_ID_REQ:
                  return {
                    ...state,
                    loading: true,
                  }
                  case VIDEO_ID_SUC:
                    return {
                      ...state,
                      loading: false,
                        videoDatabyId: action.payload,
                    }
                    case VIDEO_ID_FAIL:
                      return {
                        ...state,
                        loading: false,
                          message: action.message,
                      }
                      case FETCH_COMMENT_REQ:
                        return {
                          ...state,
                          fetching: true,
                        }
                        case FETCH_COMMENT_SUC:
                          return {
                            ...state,
                            fetching: false,
                             message: action.message,
                          }
                          case FETCH_COMMENT_FAIL:
                            return {
                              ...state,

                            }
                            default:
                              return {
                                ...state,
                                fetching: false,
                                message: action.message,
                              }
  }
}

export default videoReducer;