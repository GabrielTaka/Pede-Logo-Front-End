<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    color="lightBlack"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list-item two-line>
      <v-list-item-avatar color="white">
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/v.png"
          height="34"
          contain
        />
      </v-list-item-avatar>

      <v-list-item-title class="title">
        System Admin
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text" />
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
// Utilities
  import {
    mapMutations,
    mapState
  } from 'vuex'

  export default {
    props: {
      opened: {
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      links: [
        {
          to: '/admin/dashboard',
          icon: 'mdi-view-dashboard',
          text: 'Dashboard'
        },
        {
          to: '/admin/establishments',
          icon: 'mdi-map-marker',
          text: 'Estabelecimentos'
        },
        {
          to: '/admin/products',
          icon: 'mdi-clipboard-outline',
          text: 'Produtos'
        },
        {
          to: '/admin/users',
          icon: 'mdi-account',
          text: 'Usuários / Profissionais'
        },
        {
          to: '/admin/categories',
          icon: 'mdi-format-list-bulleted-type',
          text: 'Categoria'
        },
      ]
    }),

    computed: {
      ...mapState('app', ['image', 'color']),
      inputValue: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.setDrawer(val)
        }
      }
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
    }
  }
</script>

<style scoped>
  .lightBlack {
    background-color: rgb(0, 0, 0) !important;
    opacity: 0.9;
  }
</style>