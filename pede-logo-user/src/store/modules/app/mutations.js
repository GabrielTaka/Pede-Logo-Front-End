import { set, toggle } from '@/utils/vuex'

export default {
  setSideMenu: set('sideMenu'),
  setImage: set('image'),
  setColor: set('color'),
  toggleSideMenu: toggle('sideMenu')
}
