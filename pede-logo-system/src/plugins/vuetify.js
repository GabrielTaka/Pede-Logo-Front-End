import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#F75A3E',
        secondary: '#4caf50',
        tertiary: '#495057',
        accent: '#82B1FF',
        error: '#f55a4e',
        info: '#00d3ee',
        success: '#ffb000',
        warning: '#ffa21a',
        blueButtons: '#428BCA'

      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
