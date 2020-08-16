<template>

  <v-app>
    <default-app-bar v-if="!logged"/>

    <core-app-bar v-if="logged"/>

    <core-drawer v-if="logged"/>

    <core-view />

  </v-app>
</template>

<script>
  export default {
    components: {
      CoreDrawer: () => import('@/components/core/Drawer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View'),
      DefaultAppBar: () => import('@/components/core/AppBarExternal')
    },

    data() {
      return {
        logged: false
      }
    },

    mounted() {
      if ( localStorage.getItem( 'logged' ) == 'true' ) {
        this.$router.push('/admin/dashboard')
        this.logged = true 
        
      } else {
        this.$router.push('/') 
        this.logged = false 
      }
    },
  }
</script>
