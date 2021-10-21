import request from '../utils/request'

export function loginLable(data) {
    return request ({
        url: '/resources/login/lable',
        method: 'POST',
        data
    })
}
export function wechatDemandDetails() {
    return request({
        url: '/wechatDemand/getOne',
        method: 'GET',
        data
    })
}
export function loginwebsite(data) {
    return request({
        url: '/resources/login/website',
        method: 'POST',
        data
    })
}