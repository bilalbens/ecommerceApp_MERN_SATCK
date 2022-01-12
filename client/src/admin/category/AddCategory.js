import React,{useState} from 'react'
import Layout from '../../core/Layout'
import { isAuthenticated } from '../../auth/helpers'
import { API_URL } from '../../config'
import toastr from 'toastr'
import "toastr/build/toastr.css"



function AddCategory() {

    const [name, setName] = useState("")

    const handleChange =(e)=>{
        setName(e.target.value)
    }

    const submitCategory=(e)=>{
        e.preventDefault()

        const {user,token} = isAuthenticated();


        fetch(`${API_URL}/category/create/${user._id}`,{
            method:"POST",
            headers:{
                "Accpet":"application/json",
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify({name})
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.error){
                toastr.warning(res.error, "Please check you form !",{
                    "positionClass": "toast-bottom-left",
                })
            }

            else{
                toastr.success(`Category ${name} Created`,"New Category",{
                    "positionClass": "toast-bottom-left",
                })
                
                setName("")
            }
        })
        .catch(err=>toastr.error(err, "server error !",{
            "positionClass": "toast-bottom-left",
        }))
    }

    return (
        <div>
            <Layout title="Category"
                    desciption="Add Category"
                    className="container"
            >
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form  onSubmit={submitCategory}>
                            <div className="form-group">
                                <label htmlFor="" className="text-muted"></label>
                                <input value={name} required autoFocus placeholder="Add name of category" onChange={handleChange} type="text" className="form-control" />
                            </div>
                            <button className="btn btn-outline-primary">New Category</button>
                        </form>
                    </div>
                </div>
                

            </Layout>
            
        </div>
    )
}

export default AddCategory
