import { combineReducers  } from 'redux';

import authReducer from './Auth/authReducers'
import signupReducer from './Signup/signupReducer';
import snackReducer from './globalSnackBar/snackReducer';
import videoReducer from './Video/videoReducer';
import searchReducer from './search/searchReducer';

const rootReducer = combineReducers({
 auth: authReducer,
 signup: signupReducer,
 snack: snackReducer,
 video: videoReducer,
 search : searchReducer,
});


export default rootReducer;