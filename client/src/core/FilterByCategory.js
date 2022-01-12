import React,{useState,useEffect} from 'react'

function FilterByCategory({categories,handleFilters}) {

    const [checked] = useState(new Set())

    const handleCategory=(category)=>{
        if(checked.has(category._id)){
            checked.delete(category._id)
        }
        else{
            checked.add(category._id)

        }
        handleFilters(Array.from(checked))
        // console.log(checked)
    }
    
    return (
        <div>
            <h4>Filter by catgeories</h4>
            <ul>
                {
                    categories && categories.map((category, index)=>(
                    <li key={index} className="list-unstyled my-3">
                        <input onClick={()=>handleCategory(category)} value={category._id} type="checkbox" name=""  className=" form-check-input" id={index} />
                        <label htmlFor={index} className="form-check-label mx-3">{category.name}</label>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}

export default FilterByCategory
