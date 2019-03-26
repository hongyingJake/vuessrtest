'引入异步请求服务端配置，这里完成远程请求的业务逻辑；这里的方法调用应该是actions对远程方法的调用；'
import { createAPI } from 'create-api'

const logRequests = !!process.env.DEBUG_API

const api = createAPI({
  version: '/v0',
  config: {
    databaseURL: 'http://localhost:8081/'
  }
})
const data=[
    {
        id: 1,
        name: 'jake',
        age: '23',
        birthday:328634
    },
    {
        id: 2,
        name: 'hongying',
        age: '29',
        birthday:23188
    },
    {
        id: 3,
        name: 'gg',
        age: '2',
        birthday:1653
    }
];
//1：模拟异步数据
export function personById(id) {
    let pro=new Promise(((resolve, reject) => {
        personlst()
            .then(dataLst=>{
            let index=dataLst.findIndex((person)=>person.id==id);
            resolve(dataLst[index])
        })
            .catch(err=>{
                reject(err)
            })
    }))
    return pro;
}

export function personlst () {
    console.log('从服务端获取数据...')
  let pro=new Promise((resolve, reject)=>{
        resolve(data);
  });
  return pro;
}

//2:请求远程数据
// export function personById(id) {
//     let pro=new Promise(((resolve, reject) => {
//         api.getItemById(id).then(response=>{
//             resolve(response.data)
//         })
//     }))
//     return pro;
// }
//
// export function personlst () {
//     console.log('从服务端获取数据...')
//     let pro=new Promise((resolve, reject)=>{
//         api.getLst().then((response)=>{
//             resolve(response.data);
//         })
//     });
//     return pro;
// }
