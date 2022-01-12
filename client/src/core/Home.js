import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './ApiCore'
import Card from './Card'
import Search from './Search'


const Home=()=> {


    const [productsBestSellers, setproductsBestSellers] = useState([])
    const [productArrivals, setProductArrivals] = useState([])


    const laodBestSelllers = ()=>{
        
        // getProducts('sold','desc',6)
        getProducts({sortBy:"sold", order:"desc", limit:6})
        .then(products=>setproductsBestSellers(products))
    }

    const loadArrivals = ()=>{
        // getProducts('createdAt','desc',3)
        getProducts({sortBy:"createdAt", order:"desc", limit:3})
        .then(products=>setProductArrivals(products))
    }

    useEffect(()=>(
        loadArrivals(),
        laodBestSelllers()
    ),[])

    return (
        <div>
            <Layout title="Home Page"
                    desciption="Mern Stack Ecommerce"
                    className="container my-5"
            >
                {/* Children */}
                
                <Search></Search>
                <br />
                <hr />

                <h1>Arrival Products</h1>
                    <div className="row">
                        {productArrivals.map((product, i)=>(
                            <div className="col-md-4">
                                <Card product={product}></Card>
                            </div>

                        ))}
                    </div>
                <hr />
                <h1>Best Sellers</h1>
                    <div className="row">
                        {productsBestSellers.map((product, i)=>(
                            <div className="col-md-4">
                                <Card product={product}></Card>
                            </div>

                        ))}
                    </div>

            </Layout>
        </div>
    )
}

export default Home
