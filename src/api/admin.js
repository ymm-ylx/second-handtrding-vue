import request from '../main'
import Qs from 'qs';

export function userverify() {
    return request({
        url: "/userverify",
        method: 'get',
    })
}

export function merchantverify() {
    return request({
        url: "/merchantverify",
        method: 'get',
    })
}