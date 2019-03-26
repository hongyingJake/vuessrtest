import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
        personLst:[],//所有查找的person列表
        currentPerson:{},//当前请求person详情
        pageSize: 15,
        currentPage: 1
    },
    actions,
    mutations,
    getters
  })
}
