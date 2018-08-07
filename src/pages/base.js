import {eventBus} from 'utils/common'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog';

export default {
  data() {
    return {
      'eventBus': {eventBus},
      cloneData: {}
    }
  },
  methods: {
    toast(msg) {
      Toast({
        mes: msg,
        timeout: 1500
      });
    }
  }
}
