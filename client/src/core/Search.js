import React,{useState,useEffect} from 'react'
import { getCategories,getProducts } from './ApiCore'
import Card from './Card'

const Search=()=> {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [searchData, setSearchData] = useState({search:'',category:''})
    
    useEffect(()=>{
        getCategories()
        .then(res=>setCategories(res))

    },[])


    const handleChange=(e)=>{
        setSearchData({...searchData, [e.target.id]:e.target.value})

    }

    const resultSearch=()=>{
                return products && products.length>0 && (
                    <h3 className="mt-4"> Found {products.length} product(s)</h3>
                )
    }

    const searchSubmit = (e)=>{
        e.preventDefault();
        let {search, category} = searchData

        if(search || category){
            getProducts({search: search || undefined, category})
            .then(res=>setProducts(res))
        }
        else{
            setProducts([])
        }



        console.log(products)
    }

    





    return (
        <div>

            <form onSubmit={searchSubmit}>
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select onChange={handleChange} id="category" className="btn">
                            <option value="">Select a category</option>
                            { categories.map((category, index)=>(
                                     <option key={index} value={category._id}>{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <input onChange={handleChange} id="search" type="search" className="form-control mx-4" />
                    <div className="input-group-apprend">
                        <button className="btn">Search</button>
                    </div>
                </div>
            </form>
            <div className="row">
                {resultSearch()}
                {
                    products.map((product,i)=>(
                        <div key={product._id} className="col-md-4">
                            <Card product={product} />
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default Search
