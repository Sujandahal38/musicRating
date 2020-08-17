import { combineReducers } from 'redux';
import authReducer from './Auth/authReducer';
import snackReducer from './globalSnackBar/snackReducer'
import userReducer from './user/userReducer';
import signupReducer from './signup/signupReducer';
import videoReducer from './video/videoReducer';
import commentReducer from './comment/commentReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    snackbar : snackReducer,
    user: userReducer,
    signup: signupReducer,
    video: videoReducer,
    comment: commentReducer
});

export default rootReducer;