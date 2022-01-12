import React,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import PrivateRoute from '../auth/PrivateRoute'
import { isAuthenticated } from '../auth/helpers'




function AdminDashboard() {

    const {user:{name,email,role}} = isAuthenticated();

    const adminInfo= ()=>{
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">User Information</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{name}</li>
                        <li className="list-group-item">{email}</li>
                        <li className="list-group-item">{role? "Admin" : "User"}</li>
                    </ul>
                </div>
            </div>
            

        )
    }



    const adminLinks= ()=>{
        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">User Links</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <Link className="nav-link" to='/create/category'>Create Category</Link>
                        </li>
                        <li className="list-group-item">
                            <Link className="nav-link" to='/create/product'>Create Product</Link>
                        </li>

                        <li className="list-group-item">
                            <Link className="nav-link" to='/admin/order'>View Orders</Link>
                        </li>
                    </ul>
                </div>
            </div>

        )
    }


    return (
        <Fragment>
            <Layout
                title="Dashboard"
                desciption={`Welcome ${name}`}
                className="container"
            >

                <div className="row py-5">
                    <div className="col-md-3">
                            {adminLinks()}
                    </div>

                    <div className="col-md-9">
                        {adminInfo()}
                        
                    </div>


                </div>

            </Layout>

            
        </Fragment>
    )
}

export default AdminDashboard
