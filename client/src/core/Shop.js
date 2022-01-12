import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import FilterByCategory from './FilterByCategory'
import { getCategories, filterProduct } from './ApiCore'
import FilterByPrice from './FilterByPrice'
import Card from './Card'


function Shop() {

    const [categories, setCategories] = useState([])
    const [productFiltred, setProductFiltred] = useState([])
    const [limit, setLimit] = useState(3)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [myFilters, setMyFilters] = useState({
        category:[],
        price:[]
    })

    useEffect(()=>{
        getCategories()
        .then(res=>setCategories(res))


        filterProduct(skip, limit, myFilters)
        .then(res=>{
            setProductFiltred(res)
            setSkip(0)
            setSize(res.length)
        })


    },[myFilters])

    const handleFilters =(data, filterBy)=>{
        setMyFilters({...myFilters,[filterBy]:data})
        // console.log('Shop:',data,filterBy)


    }

    const loadMore = ()=>{

        const toskip = skip + limit

        filterProduct(toskip, limit, myFilters)
        .then(res=>{
            setProductFiltred([...productFiltred,...res])
            setSize(res.length)
            setSkip(toskip)
        })
    }

    const buttonToLoadMore = ()=>{
        return(
            (   
                size > 0 &&
                size >= limit &&
                (<div className="text-center">
                    <button onClick={loadMore} className="btn btn-outline-success">Load More</button>
                </div>)
            )
            
        )
    }

    return (
        <div>

            <Layout title="Shop Page"
                    desciption="Choose your favourite product"
                    className="container py-3"
            >
                <div className="row">
                    <div className="col-md-3">
                            <FilterByCategory handleFilters={(data)=>handleFilters(data,'category')}  categories={categories}/>
                            <FilterByPrice handleFilters={(data)=>handleFilters(data,'price')} />
                    </div>
                    
                    <div className="col-md-9">
                        <h1>Filter Product</h1>
                            <div className="row mt-3 mb-5">
                                {productFiltred.map((product, i)=>(
                                    <div key={product._id} className="col-md-4">
                                        <Card product={product}></Card>
                                        {/* {JSON.stringify(product)} */}
                                    </div>

                                ))}
                            </div>

                            {buttonToLoadMore()}
                    </div>
                </div>

            </Layout>
            
        </div>
    )
}

export default Shop
