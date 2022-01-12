import {combineReducers} from 'redux'
import authReducer from './authReducer' 
import cartReducer from './cartReducer' 


const rootReducers =combineReducers({
        cart:cartReducer,
        auth:authReducer
})


export default rootReducers;