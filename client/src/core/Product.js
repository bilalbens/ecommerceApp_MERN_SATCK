import React, {useState,useEffect} from 'react'
import { getOneProduct, getRelatedProducts } from './ApiCore'
import Card from './Card'
import Layout from './Layout'

const Product=(props)=> {

    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])

    useEffect(()=>{
        let productId = props.match.params.id
        getOneProduct(productId)
        .then(res=>{
            setProduct(res)
            return getRelatedProducts(productId)
        })
        .then(related=>setRelated(related))
        .catch(err=>console.error(err))

    },[props])


    


    return (
        <div>
            {product && product.category &&(
            <Layout title={product.name}
                    desciption="Mern Stack Ecommerce"
                    className="container my-5"
            >
                <div className="row">
                    <div className="col-md-9">
                        <Card product={product} showViewBtn={false}></Card>
                    </div>
                    <div className="col-md-3">
                        <h3>Related Products</h3>
                        {related.map((product,index)=>(
                             <Card key={product._id} product={product}></Card>
                        ))}
                    </div>
                </div>


            </Layout>
            )}
            
        </div>
    )
}

export default Product
