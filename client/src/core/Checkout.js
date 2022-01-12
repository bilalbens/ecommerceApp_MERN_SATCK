import React, {useState, useEffect} from 'react'
import { isAuthenticated, emptycart } from '../auth/helpers'
import { Link } from 'react-router-dom'
import { getBraintreeToken, processPayment, createOrder } from './ApiCore'
import DropIn from 'braintree-web-drop-in-react'
import toastr from 'toastr'
import "toastr/build/toastr.css"



function Checkout({products}){

    const [data, setData] = useState({
        braintreeToken : null,
        error: null,
        instance:{},
        address: ""
    })

    const userid = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    useEffect(()=>{
        getBraintreeToken(userid,token)
        .then(res=>setData({...data, braintreeToken: res.token}))
        .catch(err =>setData({...data, error:err}))
    },[])

    const totalPrice = (products)=>{
        return products.reduce((total,p)=>total+( p.count*p.price),0)
    }
    


    const dropIn = ()=>(
        <div>
            { data.braintreeToken !== null && products.length >0 && (
                <DropIn
                    options={{
                        authorization : data.braintreeToken,
                        paypal: {
                            flow : "vault"
                        }
                        }
                    }
                    onInstance={instance=> data.instance = instance}
                />
            )}
        </div>
    )



    const handleInput = (e)=>{
            setData({...data, address: e.target.value})
    }





    const buy= ()=>{

        const deliveryAddress = data.address;

        data.instance.requestPaymentMethod()
        .then(data=>{

            let paymentData = {
                amount: totalPrice(products),
                paymentMethodNonce : data.nonce
            }
            processPayment(userid, token,paymentData)
            .then(res=>{

                //order
                let orderData = {
                    products,
                    transaction_id: res.transaction.id,
                    amount:res.transaction.amount,
                    address: deliveryAddress
                }
                createOrder(userid, token, orderData)
                .then(res=>console.log(res))
                .catch(err=>console.log(err))


                //empty cart 
                emptycart(()=>{
                    toastr.success(`Valid`,"Thank you, Payment was successfully",{
                        "positionClass": "toast-bottom-left",
                    })
                })
                
                
            
            })
            .catch(err=>{
                toastr.error(`Invalid`,err.message,{
                    "positionClass": "toast-bottom-left",
                })
            })


            toastr.success(`Valid`,"valid carte",{
                "positionClass": "toast-bottom-left",
            })
        })
        .catch(err=>
            toastr.error(`Invalid`,err.message,{
                "positionClass": "toast-bottom-left",
            })
        )
    }

    const showBtnToCheckout = ()=>{
        if(isAuthenticated()){
            return (
                <>
                    { dropIn() }
                    <button onClick={buy} className="btn btn-raised btn btn-success my-4">Pay</button>
                </>
            )
        }
        
        return(
            <Link className="nav-link" to="/signin">
                <button className="btn btn-raised btn-block btn-warning">Sign in to Ckeckout</button>
            </Link>
        )
    }

    return (
        <div>
            <h2 className='text-center'>Total : <span className="badge badge-success">{totalPrice(products)}</span></h2>

            <label htmlFor="address">Delivery Address</label>
            <textarea id="address" className="form-control" onChange={handleInput} cols="30" rows="2"></textarea>

            {showBtnToCheckout()}           
 
        </div>
    )
}

export default Checkout
