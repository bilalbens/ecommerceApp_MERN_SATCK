import React,{Fragment} from 'react'
import { Link, withRouter } from 'react-router-dom'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { API_URL } from '../config'
import { isAuthenticated } from '../auth/helpers'

import { useSelector } from 'react-redux'

const isActive = (history, path)=>{
    if(history.location.pathname === path){
        return{color:"#0062ff"}
    }
    else{
        return {color:"#fff"}

    }
}


const Menu=(props)=> {

    //redux
    let countItem = useSelector(state => state.cart.count);

    
    const signout = ()=>{
        // method get is default in fetch
        fetch(`${API_URL}/signout`)
        .then(()=>{
            toastr.success("user signout","Next Time",{
                "positionClass": "toast-bottom-left",
            })

            localStorage.removeItem('JWT_Info')

            props.history.push('/signin')

        })
        .catch()
    }




    
    return (
        <div>       

                    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-success">
                        <Link className="navbar-brand" to="/">Ecommerce</Link>
                        <button className="navbar-toggler"
                                 type="button" data-toggle="collapse" data-target="#navbarSupportedContent"      aria-controls="navbarSupportedContent" aria-expanded="false"
                                  aria-label="Toggle navigation"
                        >
                             <span className="navbar-toggler-icon"></span>
                        </button>



                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    {/* {isAuthenticated() &&( */}
                                         <Fragment>                                        
                                            <li className="nav-item active" >
                                                <Link style={isActive(props.history, '/')} className="nav-link" to="/">Home</Link>
                                            </li>

                                            <li className="nav-item active" >
                                                <Link style={isActive(props.history, '/shop')} className="nav-link" to="/shop">Shop</Link>
                                            </li>

                                            <li className="nav-item active" >
                                                <Link 
                                                    style={isActive(props.history, `${isAuthenticated() && isAuthenticated().user.role === 1 ? '/admin':''}/dashboard`)} 
                                                    className="nav-link" 
                                                    to={`${isAuthenticated() && isAuthenticated().user.role === 1 ? '/admin':''}/dashboard`}
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        </Fragment>
                                     {/* )} */}
                                  
                                </ul>

                                <ul className="navbar-nav ml-auto">

                                    { !isAuthenticated() && (
                                        <Fragment>
                                            <li className="nav-item">
                                                <Link style={isActive(props.history, '/signin')} className="nav-link" to="/signin">Connexion</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link style={isActive(props.history, '/signup')} className="nav-link" to="/signup">Register</Link>
                                            </li>
                                         </Fragment>

                                    )}
                                    <li className="nav-item">
                                        <Link style={isActive(props.history, '/cart')} className="nav-link" to="/cart">
                                                Cart <span className="badge badge-warning"> { countItem }</span>
                                        </Link>
                                    </li>
                                    
                                    

                                    { isAuthenticated() && (
                                        <Fragment>
                                            
                                        <li className="nav-item">
                                            <span style={{cursor:"pointer"}} className="nav-link" onClick={signout}>Sign Out</span>
                                        </li>
                                        </Fragment>
                                    )}
                                    
                                </ul>
                        </div>

                    </nav>

        </div>
    )
}

export default withRouter(Menu)