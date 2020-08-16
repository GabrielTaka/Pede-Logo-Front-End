// https://vuex.vuejs.org/en/actions.html

export default {
  setEstablishment: ({ commit }, establishment) => {
    commit('SET_ESTABLISHMENT', establishment )
  },

  setCurrentUser: ({commit}, user) => {
    commit('SET_USER', user)
  }
}
