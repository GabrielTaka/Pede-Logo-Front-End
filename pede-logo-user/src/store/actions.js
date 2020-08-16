// https://vuex.vuejs.org/en/actions.html
import { securedAxiosInstance, plainAxiosInstance } from '@/packs/plugins/axios'

export default {
  getCurrentUser: async ({ commit }) => {
    let response = null

    await securedAxiosInstance.get(`api/v1/private/user/current`,
    )
    .then((result) => {
      response = result

    }).catch((err) => {
      console.log('************** ERROR **************')
      console.log(err)
      response = err
    });

    let currentUser = null
    if ( response.status == 200 ) {
      currentUser = response.data
      commit('setCurrentUser', currentUser)
      commit('setLogged', true)

    } else if ( response.status == 401 ) {
      localStorage.removeItem( 'access_token')
      localStorage.removeItem( 'created_at' )
      localStorage.removeItem( 'expires_day' )
      localStorage.removeItem( 'expires_hour' )
      localStorage.removeItem( 'expires_minute' )
      localStorage.removeItem( 'token_type' )
      localStorage.removeItem( 'logged' )
    }
  },

  setCurrentUser: ({ commit }, currentUser) => {
    commit('setCurrentUser', currentUser)
  },

  signOut: ({commit}) => {
    localStorage.removeItem( 'access_token')
    localStorage.removeItem( 'created_at' )
    localStorage.removeItem( 'expires_day' )
    localStorage.removeItem( 'expires_hour' )
    localStorage.removeItem( 'expires_minute' )
    localStorage.removeItem( 'token_type' )
    localStorage.removeItem( 'logged' )

    commit('setCurrentUser', null)
    commit('setLogged', false)
  }
}
