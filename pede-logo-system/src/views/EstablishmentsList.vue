<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">

        <v-card color="primary" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> Estabelecimentos </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize estabelecimentos cadastrados</h4>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/establishments/new" color="blueButtons" dark> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="establishments"
          class="none-background"
          :loading="isLoading" 
          loading-text="Carregando dados... Porfavor aguarde"
        >
          <template v-slot:item.name="{ item }">
            {{item.name}}
          </template>

          <template v-slot:item.email="{ item }">
            {{item.details.email}}
          </template>

          <template v-slot:item.phone="{ item }">
            {{item.details.phone}}
          </template>

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteEstablishment( item )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Excluir Estabelecimento </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="green"
                  class="cursor-type"
                  large v-on="on"
                  @click="editEstablishment( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Estabelecimento </span>
            </v-tooltip>

          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { securedAxiosInstance } from '../plugins/axios'
  import { mapMutations, mapState } from 'vuex'

  export default {
    components: {
      EstablishmentNew: () => import('@/views/EstablishmentsNew'),
    },

    computed: {
      ...mapState( ['currentUser'] ),  
    },

    mounted() {
      this.getEstablishments()
    },

    data: () => ({
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      establishments: [],
      error: false,
      isLoading: false,

      headers: [
        {
          sortable: false,
          text: 'Nome',
          value: 'name'
        },
        {
          sortable: false,
          text: 'E-mail',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Telefone',
          value: 'phone'
        },

        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getEstablishments() {
        let response = null
        this.isLoading = true

        await securedAxiosInstance.get(`/api/v1/private/establishments`,
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
        } else {
          this.error = true
        }
        this.isLoading = false
      },

      async deleteEstablishment( item ) {
        let response = null

        await securedAxiosInstance.delete(`/api/v1/private/establishments/${item.id}`,
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
          const index = this.establishments.indexOf(item)
          this.establishments.splice(index, 1)
        }
      },

      editEstablishment( id ) {
        this.$router.push(`/admin/establishments/${id}/edit`)
      }

    },
  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }

  .none-background {
    background-color: #eff1f5;
  }
</style>