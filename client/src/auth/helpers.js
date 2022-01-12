export const isAuthenticated = ()=>{
    const jwt = localStorage.getItem('JWT_Info')

    if(jwt){
        return JSON.parse(jwt)
    }

    return false;
}


export const emptycart= (callback)=>{
    localStorage.removeItem('cart')

    callback();
}
