<template>
  <v-app>
    <core-app-bar />

    <!-- <core-side-menu /> -->

    <!-- <core-view /> -->

    <core-footer />
  </v-app>
</template>

<script>
  export default {
    components: {
      CoreSideMenu: () => import('@/components/core/SideMenu'),
      CoreFooter: () => import('@/components/core/Footer'),
      CoreAppBar: () => import('@/components/core/AppBar'),
      CoreView: () => import('@/components/core/View')
    },

    created() {
    }
  }
</script>
