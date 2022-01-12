import React from 'react'

const Layout=({title,desciption,className, children})=> {
    return (
        <div>
            <div className="jumbotron mt-5">
                <h1 className="display">{title}</h1>
                <p className="lead">{desciption}</p>
            </div>
            <div className={className}>{children}</div>
        </div>
 
    )
}

export default Layout
