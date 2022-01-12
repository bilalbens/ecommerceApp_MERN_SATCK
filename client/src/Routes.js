import React from 'react';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import Shop from './core/Shop';
import Menu from './core/Menu';
import Dashboard from './user/Dashboard';
import AdminDashboard from './user/AdminDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AddCategory from './admin/category/AddCategory';
import AddProduct from './admin/product/AddProduct';
import ListOfOrders from './admin/order/ListOrders';
import Product from './core/Product';
import Cart from './core/Cart';


import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

const Routes= () =>{
    return (
        <Router>
            <Menu />
            <Switch>
                    <PrivateRoute path="/" exact component={Home} />
                    <PrivateRoute path="/shop" exact component={Shop} />
                    <PrivateRoute path="/dashboard" exact component={Dashboard} />
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                    <AdminRoute path="/create/category" exact component={AddCategory} />
                    <AdminRoute path="/create/product" exact component={AddProduct} />
                    <AdminRoute path="/admin/order" exact component={ListOfOrders} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/product/:id" exact component={Product} />
                    <Route path="/cart" exact component={Cart} />
            </Switch>
            
        </Router>
    )
}

export default Routes
