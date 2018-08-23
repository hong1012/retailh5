import axios from 'axios'
import {encode} from './querystring'

class Api {
  constructor(method) {
    if (method) {
      method = method + '.'
    }
    this.url = '/openapi/rest?method=jdy.' + method
  }
  _get(action, param, options) {
    return new Promise((resolve, reject) => {
      axios.get(this.url + action + '&' + encode(param), options).then(result => {
        resolve(result.data)
      }).catch(error => {
        reject(error)
      })
    });
  }
  _post(action, data, options) {
    return new Promise((resolve, reject) => {
      axios.post(this.url + action, data, options).then(result => {
        resolve(result.data)
      }).catch(error => {
        reject(error)
      })
    });
  }
  // 查列表
  list(param = {}) {
    return this._post('list', param)
  }
  // 查单个详细
  find(param = {}) {
    return this._post('find', param)
  }
  // 删
  delete(param) {
    return this._post('delete', param)
  }
}

class API_CARD extends Api {
  getTicket(param) {
    return this._post('getTicket', param)
  }
  // 订单支付状态
  getPayStatus(param) {
    return this._post('getPayStatus', param)
  }
  getPrepayId(param) {
    return this._post('getPrepayId', param)
  }
  getOpenidUrl(param) {
    return this._post('getOpenidUrl', param)
  }
  getMbBaseInfo(param) {
    return this._post('getMbBaseInfo', param)
  }
  // 充值记录
  queryRechargeRecord(param) {
    return this._post('queryRechargeRecord', param)
  }
  // 充值赠送规则
  getRechargeRule(param) {
    return this._post('getRechargeRule', param)
  }
  // 消费记录及详情
  queryfundRecord(param) {
    return this._post('queryfundRecord', param)
  }
  // 获取门店
  getAllStore(param) {
    return this._post('getAllStore', param)
  }
}

export let apiTest = new API_CARD('member.mbBaseInfoService');
export let apiCard = new API_CARD('wechat.recharge');
