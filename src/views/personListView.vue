<template>
    <div>
    <table>
        <thead>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>age</th>
                <th>birthday</th>
                <th>option</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="person in personlst">
                <tr>
                    <td>{{person.id}}</td>
                    <td>{{person.name}}</td>
                    <td>{{person.age}}</td>
                    <td>{{person.birthday|timeAgo}}</td>
                    <td>
                        <router-link  :to="`/person/${person.id}`">details</router-link>
                        <button @click="handleClick(person.id)">details</button>
                        <router-link  :to="{name:'personDetail',params:{id:person.id}}">details</router-link>
                    </td>
                </tr>
            </template>
        </tbody>
    </table>
        <img src="../static/images/logo-120.png"/>
        {{this.$store.state.personLst}}
    </div>
</template>

<script>
    export default {
        methods: {
          handleClick(id){
              let path='/person/'+id;
              this.$router.push(path);
          }
        },
        computed:{
          personlst (){
              return this.$store.getters.getPersonLst;
            }
        },
        //组件中如有 asyncData 方法，在渲染的时候会读取数据进行渲染
        //注意这个方法是直接写在组件中；服务端和客户端共只执行一次，服务端会把数据嵌入到页面 window.__INITIAL_STATE__ 对象中
        asyncData ({store}) {
            //获取列表数据
            // store.dispatch('list_data').then(()=>{
            //     console.log('加载列表成功...')
            // })
            // prefetch需要返回 一个Promise，服务端渲染时会等待所有的prefetch加载之后再往后执行
            //如果返回的不是Promise，会出现异步远程请求之前服务端就渲染完了，导致store.state没有写入数据
            return store.dispatch('list_data')
        },
        mounted (){
            // console.log('组件中定义的mounted...')
        }
    }
</script>

<style scoped>
    table{
        width: 50%;
    }
</style>
