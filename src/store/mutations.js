import Vue from 'vue'

export default {
    //设置人员列表数据
  set_PersonLst: (state, dataLst) => {
      state.personLst=[]
      dataLst.forEach((p,i)=>{
          Vue.set(state.personLst,i,p);
      });
      //如果采用远程API查询，这里设置的值设置不到state中，有时间查询问题
      // console.log(state.personLst);
  },
    //根据ID设置当前人员
    set_CurrentPerson: (state,curPerson)=>{
      state.currentPerson=curPerson;
    }
}
