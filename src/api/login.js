import request from '../main'
import Qs from 'qs';

export function login(query) {
    return request({
        url: "/login",
        method: 'post',
        data: Qs.stringify(query)
    })
}


export function rigister(query){
    return request({
        url: "/register",
        method: 'post',
        data: Qs.stringify(query)
    })
}