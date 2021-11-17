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
// 订单列表
export function orderList(data) {
    return request({
        url: '/business/order/order',
        method: 'POST',
        data
    })
}
// 投递报名
export function delivery(data) {
    return request({
        url: '/business/order/delivery',
        method: 'POST',
        data
    })
}
// 订单详情数据
export function orderdetails(data) {
    return request({
        url: '/business/order/orderdata',
        method: 'POST',
        data
    })
}
// 投递的配音师
export function orderteacher(data) {
    return request({
        url: '/business/order/orderteacher',
        method: 'POST',
        data
    })
}
// 配音师状态
export function profileStatus(data) {
    return request({
        url: '/business/profile/status',
        method: 'POST',
        data
    })
}
// 需求类型
export function ordertype(data) {
    return request({
        url: '/business/order/ordertype',
        method: 'POST',
        data
    })
}
// 发布需求 
export function orderAdd(data) {
    return request({
        url: '/business/order/add',
        method: 'POST',
        data
    })
}
// 发布需求 
export function getphone(data) {
    return request({
        url: '/business/login/getphone',
        method: 'POST',
        data
    })
}
// 投递报名
export function orderdelivery(data) {
    return request({
        url: '/business/order/delivery',
        method: 'POST',
        data
    })
}
// 提前结束订单
export function orderEnd(data) {
    return request({
        url: '/business/order/end',
        method: 'POST',
        data
    })
}
// 操作中标
export function orderBid(data) {
    return request({
        url: '/business/order/bid',
        method: 'POST',
        data
    })
}