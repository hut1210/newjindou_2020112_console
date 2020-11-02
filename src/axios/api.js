import axios from '@/axios'

// 登录 
export function login(data) {
    return axios.post('/gpauth/system/users/login', data)
}

// 商户注册列表
export function reviewMerchantList(data) {
    return axios.post('/gpmanage/partner/merchant/review/users', data)
}

// 商户列表 
export function MerchantList(data) {
    return axios.post('/gpmanage/partner/merchant/review/list', data)
}

// 账户列表  
export function accountlist(data) {
    return axios.post('/gpmanage/partner/merchant/review/accountlist', data)
}

// 商户审核列表  
export function examinelist(data) {
    return axios.post('/gpmanage/partner/merchant/review/list', data)
}

// 商户审核列表  -- 详情
export function examinedetail(data) {
    return axios.get('/gpmanage/partner/merchant/review/' + data, {})
}

// 商户审核通过  
export function merchantpass(data) {
    return axios.post('/gpmanage/partner/merchant/review/pass', data)
}

// http://test.gettin.in/gpmanage/partner/merchant/info
// 商户审核
export function audit(data) {
    return axios.post('/gpmanage/partner/merchant/review/audit', data)
}

// 商户基本信息列表  
export function baseinfoList(data) {
    return axios.post('/gpmanage/partner/merchant/review/baseinfos', data)
}

// 订单信息列表 
export function orderList(data) {
    return axios.post('/core/manager/order/list', data)
}
// 订单支付详情
export function detailOrderList(data) {
    debugger
    return axios.get('/core/api/payment/payorderlist/'+data)
}

// 代付审核列表  
export function payoutList(data) {
    return axios.post('/core/api/payment/payout/list', data)
}

// 代付审核详情  
export function payoutdetaillist(data) {
    return axios.post('/core/api/payment/payout/detaillist', data)
}

// 代付审核 修改状态
export function payoutupdate(data) {
    return axios.post('/core/api/payment/payout/update', data)
}

// 代付列表  导出 
export function payoutexport(data) {
    return axios.post('/core/api/payment/payout/list/export', data)
}

// 提现审核列表 
export function reviewwithdraws(data) {
    return axios.post('/core/manager/withdraws', data)
}

// 提现审核 
export function reviewwithdrawaudit(data) {
    return axios.post('/core/manager/withdraw/audit', data)
}

// 支付通道
export function paychannel(data) {
    return axios.get('/core/manager/pay/channel', data)
}

// 支付方式下拉列表  
export function paytype(data) {
    return axios.get('/core/manager/pay/type', data)
}

// 查询当前自动代付状态  
export function autopassstatus(data) {
    return axios.get('/core/manager/payout/autopass/status', data)
}

// 设置是否自动代付 
export function autopass(data) {
    return axios.post('/core/manager/payout/autopass', data)
}

// 充值审核列表 
export function rechargelist(data) {
    return axios.post('/core/api/payment/recharge/list', data)
}

// 充值审核列表导出 
export function rechargelistexport(data) {
    return axios.post('/core/api/payment/recharge/list/export', data)
}

// 充值  
export function recharge(data) {
    return axios.post('/core/api/payment/recharge', data)
}

// 充值审核/修改接口
export function rechargeaudit(data) {
    return axios.post('/core/api/payment/recharge/audit', data)
}
