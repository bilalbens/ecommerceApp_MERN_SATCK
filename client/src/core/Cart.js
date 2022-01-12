import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Layout from './Layout'
import ShowImage from './ShowImage'
import { incProductCount,decProductCount, removeProduct } from '../actions/cartActions'
import Checkout from './Checkout'

const Cart=()=>{
    let productInCart = useSelector(state=>state.cart.products)
    let dispatch = useDispatch();


    return (
        <div>

            <Layout title="Cart Page"
                    desciption="List of products in Cart"
                    className="container my-5"
            >  
                <div className="row">
                    <div className="col-md-8">
                        <h3>Your Cart</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {productInCart.map((product,i)=>(
                                    <tr key={product._id}>
                                        <td width="80px" height="100px">
                                            <ShowImage item={product} url="product/photo" className="card-img-top"></ShowImage>
                                        </td>
                                        <td>
                                            <h5>{product.name}</h5>
                                            <p className="well">{product.description}</p>
                                        </td>
                                        <td>
                                            <div className="input-group">
                                                <h3>
                                                    <span className="span span-success">{product.count}
                                                    </span>
                                                </h3>
                                                <div className="input-group-prepend mx-4">
                                                    <button onClick={()=>dispatch(incProductCount(product))} className="btn btn-info btn-sm mx-1">
                                                        <i className="fas fa-plus"></i>
                                                    </button>

                                                    {product.count>1 &&
                                                        <button onClick={()=>dispatch(decProductCount(product))} className="btn btn-secondary btn-sm">
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                    }
                                                   
                                                </div>
                                            </div>

                                        </td>
                                        <td>${product.price}</td>
                                        <td>${product.price*product.count}</td>
                                        <td>
                                            <button onClick={()=>dispatch(removeProduct(product._id))}  className="btn btn-sm btn-dark">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-4">
                        <Checkout products={productInCart} />
                    </div>
                </div>
            </Layout> 
            
        </div>
    )
}

export default Cart
