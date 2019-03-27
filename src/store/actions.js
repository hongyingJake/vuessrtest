'引入远程API，这里实现业务逻辑'
import {
    personlst,
    personById
} from '../api'

export default {
  // 获取远程服务器数据列表
  list_data: (context) => {
    return personlst()
        .then((data)=>{
            context.commit('set_PersonLst',data)
        })
  },
    //设置当前人
    item_data: (context,id)=>{
        return personById(id)
            .then(data=>{
                context.commit('set_CurrentPerson',data);
            })
    }
}
