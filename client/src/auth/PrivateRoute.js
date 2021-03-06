import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/helpers'



function PrivateRoute({component:Component, ...rest}) {
    return(
    <Route
        {...rest}
        render={props=>
                isAuthenticated() ? (<Component {...props}/>) : <Redirect to={{ pathname:"/signin"}} />
        }
        
    
    />
    )
    
    

}

export default PrivateRoute
