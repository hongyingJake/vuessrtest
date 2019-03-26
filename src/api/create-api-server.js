'对于生产服务端的api配置，这样需要缓存配置;这里定义应该是资源API的定义'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LRU from 'lru-cache'

Vue.use(VueAxios, axios)

export function createAPI ({ config, version }) {
  let api
  if (process.__API__) {
    api = process.__API__
  } else {
    //对生产环境使用缓存
    api = process.__API__ ={
        getLst (){
            let path=config.databaseURL+"person/getList"
            return Vue.axios.get(path);
        },
        getItemById (id) {
            let path=config.databaseURL+"person/getPersonById?id="+id
            return Vue.axios.get(path);
        }
    }
  }
  return api
}
