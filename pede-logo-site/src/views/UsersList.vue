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
              <h3 class="title font-weight-light"> Profissionais </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize os profissionais cadastrados</h4>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/users/new" color="blueButtons" dark> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-alert v-if="deleteAlert" type="success">
            Usuário excluido
        </v-alert>

        <v-data-table
          :headers="headers"
          :items="users"
          class="none-background"
          :loading="isLoading" 
          loading-text="Carregando dados... Porfavor aguarde"
        >
          <template v-slot:item.email="{ item }">
            {{item.email}}
          </template>

          <template v-slot:item.role="{ item }">
            {{item.role}}
          </template>

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteUser( item )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Excluir Profissional </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="success"
                  class="cursor-type"
                  large v-on="on"
                  @click="editUser( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Profissional </span>
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
      this.establishment_id = this.$store.state.selectedEstablishment.id
      this.getUsers( this.establishment_id )
    },

    data: () => ({
      establishment_id: null,

      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      users: [],
      error: false,
      deleteAlert: false,
      isLoading: false,

      headers: [
        {
          sortable: false,
          text: 'E-mail',
          value: 'email'
        },
        {
          sortable: false,
          text: 'Papel',
          value: 'role'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getUsers( id ) {
        let response = null
        this.isLoading = true

        await securedAxiosInstance.get(`/api/v1/private/establishments/${id}/users`,
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
          this.users = response.data
        } else {
          this.error = true
        }
        this.isLoading = false
      },

      async deleteUser( item ) {
        let response = null
        await securedAxiosInstance.delete(`/api/v1/private/users/${item.id}`,
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
          const index = this.users.indexOf(item)
          this.users.splice(index, 1)
        }

        this.deleteAlert = true
        setTimeout(() => {
        this.deleteAlert = false
        }, 5000);
      },

      editUser( id ) {
        this.$router.push(`/admin/users/${id}/edit`)
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