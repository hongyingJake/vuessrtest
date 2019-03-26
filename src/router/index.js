import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const personListView = () => import('../views/personListView.vue')
const personView = () => import('../views/personView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/person/:id(\\d+)', component: personView ,name:'personDetail'},
      { path: '/list', component: personListView },
      { path: '*', redirect: '/list' }
    ]
  })
}
