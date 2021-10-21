import store from "../store";
// const BASE_URL = 'http://42.192.120.145:8001'
const BASE_URL = 'https://www.peiyinstreet.com'
function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        // userToken: '1' || ''
        userToken: store.state.user.token || ''
      },
      success: ({ data }) => {
        if (data.errcode===0) {
          resolve(data);
        } else {
          if(data.errmsg==='配音师不存在'){
            uni.switchTab({
              url: '/pages/index/index'
            });
          }else {
            reject(data);
          }
        }
      },
      fail: (error) => {
        reject(error);
      }
    })
  })
}

export default request;
