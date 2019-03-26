'开发环境的api配置'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export function createAPI ({ config, version }) {
    let api
    if (process.__API__) {
        api = process.__API__
    } else {
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
