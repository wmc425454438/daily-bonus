const fetch = require('node-fetch');
const { headers } = require('./config');

const sign_in = async () => {

    const today_status = await fetch('https://api.juejin.cn/growth_api/v1/get_today_status', {
        headers,
        method: 'GET',
        credentials: 'include'
    }).then(res => res.json());

    if (today_status.err_no  !== 0) return Promise.reject('签到失败！');
    if (today_status.data) return '今日已签到！';

    const check_in = await fetch('https://api.juejin.cn/growth_api/v1/check_in', {
        headers,
        method: 'POST',
        credentials: 'include',
    }).then(res => res.json());

    if (check_in.err_no !== 0) return Promise.reject('签到异常！');

    return `签到成功！`;
};

module.exports = sign_in;
