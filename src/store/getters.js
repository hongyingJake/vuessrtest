export default {
  getPersonLst (state) {
    const persons=state.personLst
    if (!persons) {
      return []
    }
    return persons;
  }
}
