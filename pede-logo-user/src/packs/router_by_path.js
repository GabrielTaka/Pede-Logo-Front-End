import Vue from 'vue'

import routerAdmin from '@/packs/router/admin.js'
import routerMain from '@/packs/router/main.js'

let pathname = window.location.pathname
let router
if (pathname == '/admin') {
  router = routerAdmin
} else {
  router = routerMain
}

export default router