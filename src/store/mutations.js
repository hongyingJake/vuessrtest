import Vue from 'vue'

export default {
    //设置人员列表数据
  set_PersonLst: (state, dataLst) => {
      state.personLst=[]
      dataLst.forEach((p,i)=>{
          Vue.set(state.personLst,i,p);
      });
  },
    //根据ID设置当前人员
    set_CurrentPerson: (state,curPerson)=>{
      // console.log(curPerson)
      state.currentPerson=curPerson;
    }
}
