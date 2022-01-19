import axios from 'axios'

const request = axios.create({
    baseURL:'https://conduit.productionready.io'
})

request.interceptors.request.use(config=>{
    console.log(123)
    // config.headers.Authorization = ``
    return config
},err=>{
    return Promise.reject(err)
})

export default request