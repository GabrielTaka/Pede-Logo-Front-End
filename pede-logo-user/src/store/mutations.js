// https://vuex.vuejs.org/en/mutations.html
import { set, toggle } from '@/utils/vuex'

export default {
  setCurrentUser: set('currentUser'),
  setLogged: set('logged')
}