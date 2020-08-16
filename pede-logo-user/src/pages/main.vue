<template>
  <v-app id="app">
    <nav-bar v-if="!logged"/>
    <nav-bar-user v-if="logged"/>

    <router-view></router-view>

    <footer-bar/> 
  </v-app>
</template>

<script>
  import NavBar from '../components/NavBar';
  import NavBarUser from '../components/NavBarUser';
  import FooterBar from '../components/FooterBar'

  export default {
    components: {
      NavBar, NavBarUser, FooterBar
    },

    data() {
      return {
        logged: false
      }
    },

    computed: {},

    mounted() {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'setLogged' ) {
          this.logged = state.logged
        }
      })

      this.verifyLogged()
    },

    methods: {
      verifyLogged() {
        console.log("===================")
        console.log( localStorage.getItem( 'logged' ) )
        console.log("===================")
        if ( localStorage.getItem( 'logged' ) == 'true' ) {
          this.logged  = true 
        } else {
          this.logged = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
