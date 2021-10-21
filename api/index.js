import request from '../utils/request'

export function login(data) {
    return request ({
        url: '/business/login/login',
        method: 'POST',
        data
    })
}
// 调音师信息
export function businessProfile(data) {
    return request ({
        url: '/business/profile/index',
        method: 'POST',
        data
    })
}
// 创建配音师标签
export function tagAll() {
	return request ({
		url: '/business/tag/all',
		method: 'POST'
	})
}
// 筛选标签
export function homeConfig() {
    return request ({
        url: '/resources/home/config',
        method: 'GET'
    })
}
// 获取省数据
export function profileProvince() {
	return request ({
		url: '/business/profile/province',
		method: 'POST'
	})
}
// 获取市的数据
export function profileCity(data) {
	return request ({
		url: '/business/profile/city',
		method: 'POST',
        data
	})
}
// 配音师编辑
export function profileUpdate(data) {
	return request ({
		url: '/business/profile/update',
		method: 'POST',
        data
	})
}

export function serviceublish(data) {
    return request ({
        url: '/business/service/publish',
        method: 'POST',
        data
    })
}
// 编辑配音师
export function editserviceublish(data) {
    return request ({
        url: '/business/service/update',
        method: 'POST',
        data
    })
}
// 配音师库
export function serviceLits(data) {
    return request ({
        url: '/business/service/service',
        method: 'POST',
        data
    })
}
// 分享
export function profileShare(data) {
    return request ({
        url: '/business/profile/share',
        method: 'POST',
        data
    })
}
// 排名
export function serviceRank(data) {
    return request ({
        url: '/business/service/rank',
        method: 'POST',
        data
    })
}