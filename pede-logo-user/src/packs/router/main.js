/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

//Components
import Landing from '@/components/externals/Landing'
import EstablishmentList from '@/components/externals/EstablishmentList'
import EstablishmentDetails from '@/components/externals/EstablishmentDetails'
import Login from '@/components/externals/Login'
import Register from '@/components/externals/Register'
import Orders from '@/components/externals/MyOrders'
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: Landing, props: true },
    { path: "/sign-in", component: Login, props: true },
    { path: "/sign-up", component: Register, props: true },
    { path: "/establishments", component: EstablishmentList, props: true },
    { path: "/establishments/:id", component: EstablishmentDetails, props: true },
    { path: "/my-orders", component: Orders, props: true },
  ]
})

export default router
