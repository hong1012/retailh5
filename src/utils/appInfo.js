/**
 * Created by hong on 2018/8/8.
 */
import {getStore, setStore} from 'utils/common'
const appkey = 'appKey'

class AppInfo {
  constructor() {
    this.dbid = '';
    this.cardId = '';
    this.openidCard = '';
    this.loginName = '';
    this.uid = '';
    this.openId = '';
    this.ticket = '';
    this.carInfo = {
      'appId': '',
      'balamt': '',
      'card': '',
      'giftamt': '',
      'mbCardName': '',
      'businessInfo': '',
      'mobile': '',
      'name': '',
      'rechargeamt': '',
      'totalrechamt': ''
    };
  }
  setData(obj) {
    if (!obj.openId) {
      // 为空表示是 第一次跳转  先把其它信息缓存.
      setStore(appkey, obj);
    } else {
      // 不为空则把之前的缓存在本地的信息 提取出来
      let info = getStore(appkey);
      if (info) {
        obj.cardId = info.cardId;
        obj.loginName = info.loginName;
        obj.uid = info.uid;
      }
    }
    Object.assign(this, obj)
  }
  getData() {
    return this;
  }
  setTicket(ticket) {
    this.ticket = ticket;
  }
  setCardInfo(card) {
    Object.assign(this.carInfo, card);
  }
  getCard() {
    return this.carInfo;
  }
}

let appInfo = new AppInfo();
export {appInfo}