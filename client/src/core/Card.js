import React from 'react'
import { Link } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'

import { addToCart } from '../actions/cartActions'
import { useDispatch } from 'react-redux'


const Card=({product, showViewBtn=true})=> {

    //redux
    let dispatch = useDispatch();


    const showStock = (quantity)=>{
        return quantity > 0 ? <span className="badge badge-primary">{quantity} in Stock</span> : <span className="badge badge-danger">Out of Stock</span> 
    }
 
    return (
        <div>
            <div className="card my-2">
                <div className="card-header">
                    <h4 className="display-6">{product.name}</h4>
                </div>
                <ShowImage item={product} url="product/photo" className="card-img-top"></ShowImage>
                <div className="card-body">
                    <p>{product.description}</p>
                    <div> 
                        <h3><span className="badge badge-info">${product.price}</span> </h3>
                        <span className="badge-pill badge-success">{product.category.name}</span> 

                    </div>
                    <div className="well my-3">
                        <h5>
                            {showStock(product.quantity)}
                            <span className="mx-3">Added {moment(product.createdAt).fromNow()}</span>
                        </h5>
                    </div>
                    {showViewBtn && (
                        <Link to={`/product/${product._id}`}>
                            <button className="btn btn-warning mr-1">View</button>
                        </Link>
                    )}
                    
                    { product.quantity > 0 && (
                    <button onClick={() => dispatch(addToCart(product))} className="btn btn-success">Add to Cart</button>

                    ) }
                </div>
            </div>
        </div>
    )
}

export default Card
