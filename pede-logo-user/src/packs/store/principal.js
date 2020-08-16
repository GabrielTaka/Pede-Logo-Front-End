import Vue from 'vue/dist/vue';
import Vuex from 'vuex';
import VueResource from "vue-resource/dist/vue-resource";
import { plainAxiosInstance, securedAxiosInstance } from '../plugins/axios'

Vue.use(Vuex);
Vue.use(VueResource);

//styles
import '../../styles/global.scss'


export default new Vuex.Store({
  state: {
    logged: false,
    currentUser: {},
    landing: true
  },

  actions: {
    setLogged: ({ commit }) => {
      commit('SET_LOGGED', true)
    },

    signOut: async ({ commit }, csrfToken) => {
      await securedAxiosInstance.delete("/users/sign_out", {data: {authenticity_token: csrfToken}})
      //localStorage.setItem( 'logged', false )
      //commit('SET_LOGGED', false)
      //commit('SET_CURRENT_USER', {})
    },

    setCurrentUser: async ({ commit }) => {
      const user = (await securedAxiosInstance.get("/users/current.json")).data
      commit('SET_CURRENT_USER', user)
    },
  },

  mutations: {
    SET_LOGGED(store, obj) {
      store.logged = obj
    },

    SET_CURRENT_USER(store, obj) {
      store.currentUser = obj
    },
  }
})
