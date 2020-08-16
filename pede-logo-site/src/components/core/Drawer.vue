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
        PEDE LOGO
      </v-list-item-title>
    </v-list-item>

    <v-divider class="mx-3 mb-3" />

    <v-list nav>
      <!-- Bug in Vuetify for first child of v-list not receiving proper border-radius -->
      <div />
      <v-select
        v-model="select"
        :items="establishments"
        @change="selectedEstablishments($event)"
        item-text="name"
        item-value="id"
        label="Selecione um Estabelecimento"
        persistent-hint
        return-object
        single-line
      ></v-select>

      <v-list-item
        v-for="(link, i) in links"
        :key="i"
        :to="link.to"
        active-class="primary white--text"
        
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-title v-text="link.text"/>
      </v-list-item>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  import { securedAxiosInstance } from '../../plugins/axios'
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
          text: 'Estabelecimento'
        },
        {
          to: '/admin/products',
          icon: 'mdi-clipboard-outline',
          text: 'Produtos'
        },
        {
          to: '/admin/users',
          icon: 'mdi-account',
          text: 'Profissionais'
        },
        /*{
          to: '/admin/tables',
          icon: 'mdi-tablet',
          text: 'Mesas'
        }, */
        {
          to: '/admin/schedulings',
          icon: 'mdi-calendar-month-outline',
          text: 'Pedidos'
        }
      ],

      select: null,
      items: [
        { state: 'Florida', abbr: 'FL' },
        { state: 'Georgia', abbr: 'GA' },
        { state: 'Nebraska', abbr: 'NE' },
        { state: 'California', abbr: 'CA' },
        { state: 'New York', abbr: 'NY' },
      ],
      establishments: []

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
      },

      currentUser() {
        return this.$store.state.currentUser
      }

    },

    mounted() {
      this.getEstablishments()
    },

    methods: {
      ...mapMutations('app', ['setDrawer', 'toggleDrawer']),

      async getEstablishments() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/establishments_by_user/`,
          {
            params: { access_token: localStorage.getItem('access_token') }
          }
        )
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

        if ( response.status == 200 ) {
          this.establishments = response.data
        }
      },

      selectedEstablishments ( e ) {
        this.$store.dispatch('setEstablishment', e);
      },

      verifyShow( link ) {
        if( link.text == 'Agendamento') {
          return true 

        } else if (this.currentUser.role == "establishment_admin") {
          return true
        }
      }

    }
  }
</script>


<style scoped>
  .lightBlack {
    background-color: rgb(0, 0, 0) !important;
    opacity: 0.9;
  }
</style>