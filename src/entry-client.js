import Vue from 'vue'
//兼容各个浏览器的promise对象和es6兼容
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)


// 当路由组件的参数发生更改时，调用“asyncData”的全局mixin
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    //解析所有组件中的，找出有 asyncData 函数的组件列表
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
      // console.log(matched,prevMatched)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
      // console.log(activated)
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
      // console.log(asyncDataHooks)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
      //依次调用asyncData获取数据成功后，跳到到下一个路由
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to})))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
//浏览器后台挂起新线程，来缓解 JavaScript 的单线程问题;navigator.serviceWorker内部大量使用Promise对象
//sw-precache-webpack-plugin 客户端配置插件
//离线应用缓存
//SWPrecacheWebpackPlugin是一个webpack插件，用于使用service worker来缓存外部项目依赖项。
// 它将使用sw-precache生成service worker文件并将其添加到您的构建目录。
// 为了在service worker中生成预缓存的名单, 这个插件必须应用在assets已经被webpack打包之后。
//然而，这个方案只能在HTTPS协议中应用，http不能生效
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
