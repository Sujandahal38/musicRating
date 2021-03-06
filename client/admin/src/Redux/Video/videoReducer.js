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
  FETCH_COMMENT_FAIL,
  DELETE_VIDEO_REQ,
  DELETE_VIDEO_SUC,
  DELETE_VIDEO_FAIL,
  EDIT_VIDEO_REQ,
  EDIT_VIDEO_SUC,
  EDIT_VIDEO_FAIL,
  ANALYZE_REQ,
  ANALYZE_SUC,
  ANALYZE_FAIL
} from './videoType';


const initialState = {
  loading: false,
  message: '',
  status: 0,
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
                            case DELETE_VIDEO_REQ:
                              return {
                                ...state,
                                deleting: true,
                              }
                              case DELETE_VIDEO_SUC:
                                return {
                                  ...state,
                                  deleting: false,
                                  message: action.payload,
                                }
                                case DELETE_VIDEO_FAIL:
                                  return {
                                    ...state,
                                    deleting: false,
                                    message: action.payload,
                                  }
                                  case EDIT_VIDEO_REQ:
                                  return {
                                    ...state,
                                    editing : true,
                                  }
                                  case EDIT_VIDEO_SUC:
                                     return{
                                      ...state,
                                      editing: false,
                                      message: action.payload,
                                     }
                                     case EDIT_VIDEO_FAIL:
                                     return {
                                       ...state,
                                       editing: false,
                                       message: action.payload,
                                     }
                                     case ANALYZE_REQ:
                                       return {
                                         ...state,
                                         analyzing: true,
                                       }
                                       case ANALYZE_SUC:
                                       return {
                                        ...state,
                                        analyzing: false,
                                        message: action.message,
                                        ratings: action.rating
                                       }
                                       case ANALYZE_FAIL:
                                         return {
                                          ...state,
                                          analyzing: false,
                                          message: action.message,
                                         }
                            default:
                              return {
                                ...state
                              }
  }
}

export default videoReducer;