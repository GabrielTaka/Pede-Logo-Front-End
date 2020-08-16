// https://vuex.vuejs.org/en/mutations.html

export default {
  SET_ESTABLISHMENT(store, obj) {
    store.selectedEstablishment = obj
  },

  SET_USER(store, obj) {
    store.currentUser = obj
  },
}
