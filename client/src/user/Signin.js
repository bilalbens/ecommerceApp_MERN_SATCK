import React, {useState} from 'react'
import Layout from '../core/Layout'
import toastr from 'toastr'
import "toastr/build/toastr.css"
import { API_URL } from '../config'






const Signin=(props)=> {

    const [user, setUser] = useState({
            email:"",
            password:""
    })


    const handleChange = e=>{
        setUser({...user, [e.target.id]:e.target.value})
    }


    const submitSignin = (e)=>{
        e.preventDefault();

        fetch(`${API_URL}/signin`,{
            method:"POST",
            headers:{
                "Accpet":"application/json",
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.error){
                toastr.warning(res.error, "Please check you form !",{
                    "positionClass": "toast-bottom-left",
                })
            }

            else{
                toastr.info("user is authenticated successfully","Welcome",{
                    "positionClass": "toast-bottom-left",
                })
                
                localStorage.setItem("JWT_Info", JSON.stringify(res))
                props.history.push('/')
            }
        })
        .catch(err=>toastr.error(err, "server error !",{
            "positionClass": "toast-bottom-left",
        }))
    }


    const form = ()=>(
        <form onSubmit={submitSignin}>
            <div className="form-group">
                <label htmlFor="email" className="text-muted">email</label>
                <input  onChange={handleChange} type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
                <label htmlFor="password" className="text-muted">password</label>
                <input  onChange={handleChange} type="password" className="form-control" id="password" />
            </div>
            <button className="btn btn-lg btn-block btn-outline-info">Sing In</button>

        </form>
    )



    return (
        <div>
            <Layout title="Signin Page"
                    desciption="Signin Mern Stack Ecommerce App"
                    className="container"
            >
                {/* Children */}
            <div className="row">
                <div className="col-md-6 mx-auto">
                 {form()}
                </div>
            </div>
                

            </Layout>
        </div>
    )
}

export default Signin
