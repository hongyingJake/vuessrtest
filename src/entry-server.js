import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production'

// 这个函数有bundleRenderer 异步调用（异步读取数据以生成Bundle）
// entry-server服务端会传递一个context对象，里面包含当前用户请求的url，
// vue-router 会跳转到当前请求的url中，通过 router.getMatchedComponents( ) 来获得当前匹配组件，
// 则去调用当前匹配到的组件里的 preFetch 钩子，并传递store（Vuex下的状态），会返回一个 Promise 对象，
// 并在then方法中将现有的vuex state 赋值给context，给服务端渲染使用，最后返回vue实例，将虚拟DOM渲染成网页。
// 服务端会将vuex初始状态也生成到页面中。
// 如果 vue-router 没有匹配到请求的url，直接返回 Promise中的reject方法，传入404
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()
    const { app, router, store } = createApp()

    const { url } = context
    const { fullPath } = router.resolve(url).route
    //检查调整的路由是否在路由表中配置了
    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location，设置服务端路由，路由完了就开始渲染数据
    router.push(url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
        // 调用组件中所有asyncData获取数据到store
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
          console.log('服务端已经渲染完成。。。')
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
