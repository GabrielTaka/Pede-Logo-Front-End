import Vue from 'vue'

import main from '@/pages/main'
import admin from '@/pages/admin'

let pathname = window.location.pathname
let app
if (pathname == '/admin') {
  app = admin
} else {
  app = main
}

export default app