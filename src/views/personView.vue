<template>
    <div>
        <router-link to="/list">返回</router-link>
        <table>
            <thead>
                <tr>
                    <th>title</th>
                    <th>val</th>
                </tr>
            </thead>
            <tbody>
            <template v-for="(p,index) in person">
                <tr>
                    <td>{{index}}</td>
                    <td>{{p}}</td>
                </tr>
            </template>
            </tbody>
        </table>

    </div>
</template>

<script>
    import { personById } from '../api'

    export default {
        data () {
            return {
                //1：配合mounted 判断服务端是否渲染
                person:this.$store.state.currentPerson
            }
        },
        mounted () {
            //1:直接查询API不会进行服务端渲染（没有经过vuex.store）
            let id = this.$route.params.id;
            // personById(id).then((data)=>{
            //     this.person=data;
            // });
            // 3：采用修改$store的值查看是否进行了服务端渲染
            //this.$store.state.currentPerson
            //可知，只有使用了$store 才会进行服务端预渲染，直接查询api或者计算属性等操作都是操作JS，不会渲染
            //this.$store.dispatch('item_data',id);
        },
        //异步加载数据，服务端渲染
        asyncData ({store,route}){
            let id=route.params.id;
            return store.dispatch('item_data',id);
         },
        computed:{
            personModel(){
                //2:这种方式并没有进行预渲染(需要修改 $store的值)
                // let id=this.$route.params.id;
                // let index=this.$store.state.personLst.findIndex((person)=>person.id==id);
                // return this.$store.state.personLst[index];
                return this.$store.state.currentPerson;
            }
        }
    }
</script>

<style scoped>

</style>
