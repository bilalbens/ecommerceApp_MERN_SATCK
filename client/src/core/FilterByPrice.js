import React,{useState} from 'react'

const FilterByPrice=({handleFilters})=> {

    const prices = [
        {
            _id:1,
            name:"Any",
            value:[]
        },
        {
            _id:2,
            name:"0$ to 39$",
            value:[0,39]
        },
        {
            _id:3,
            name:"40$ to 79$",
            value:[40,79]
        },
        {
            _id:4,
            name:"80$ to 119$",
            value:[80,119]
        },
        {
            _id:5,
            name:"120$ to 160$",
            value:[120,160]
        },
        {
            _id:6,
            name:"More",
            value:[161,99999]
        },
    ]

    // const [checkedPrices] = useState(new Set())

    const handlePrice=(e)=>{
 
        handleFilters(prices[e.target.value]["value"])
        // console.log(checkedPrices)
    }
    return (
        <div>
            <h4 className="mt-5">Filter By Price</h4>
            {prices.map((price,index)=>(
                <div key={index} className="my-1">
                    <label htmlFor={`${index}-${price.name}`}>
                        <input 
                            type="radio" 
                            name="price" 
                            id={`${index}-${price.name}`} 
                            className="mx-3" 
                            onChange={handlePrice} 
                            value={index}
                        />
                        {price.name}
                    </label>
                </div>
            ))}
            
        </div>
    )
}

export default FilterByPrice
