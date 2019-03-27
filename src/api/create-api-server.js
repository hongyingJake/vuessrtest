'对于生产服务端的api配置，这样需要缓存配置;这里定义应该是资源API的定义'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import LRU from 'lru-cache'

Vue.use(VueAxios, axios)

const isProd = process.env.NODE_ENV === 'production'
//api结果缓存
const apiCache=LRU({
    max:1000,
    maxAge:1000*60*15
})

export default function createServerAPI ({ config, version }) {
  let api
  if (process.__API__) {
    api = process.__API__
  } else {
    //对生产环境使用缓存
    api = process.__API__ ={
        apiResultCache:apiCache,
        isProd:isProd,
        getLst (){
            let path=config.databaseURL+"person/getList"
            return Vue.axios.get(path);
        },
        getItemById (id) {
            let path=config.databaseURL+"person/getPersonById?id="+id
            return Vue.axios.get(path);
        },
        getPostLst(){
            let path=config.databaseURL+"person/getList"
            return Vue.axios.post(path,{});
        }
    }
  }
  return api
}
