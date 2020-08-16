<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">

        <v-card color="green" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> Subcategorias </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize subcategorias cadastradas</h4>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/subcategories/new" color="blueButtons" dark> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="subcategories"
          class="none-background"
          :loading="isLoading" 
          loading-text="Carregando dados... Porfavor aguarde"
        >
          <template v-slot:item.name="{ item }">
            {{item.name}}
          </template>

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteSubcategory( item )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Excluir Categoria </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="success"
                  class="cursor-type"
                  large v-on="on"
                  @click="editSubcategory( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Categoria </span>
            </v-tooltip>

          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { securedAxiosInstance } from '../../plugins/axios'
  import { mapMutations, mapState } from 'vuex'

  export default {
    components: {},

    computed: {
      ...mapState( ['currentUser'] ),  
    },

    mounted() {
      this.getSubategories()
    },

    data: () => ({

      subcategories: [],
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
          text: 'Categoria',
          value: 'category_type.name'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getSubategories() {
        let response = null
        this.isLoading = true

        await securedAxiosInstance.get(`/api/v1/subcategories`,
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
          this.subcategories = response.data

        } else {
          this.error = true
        }
        this.isLoading = false
      },

      async deleteSubcategory( item ) {
        let response = null

        await securedAxiosInstance.delete(`/api/v1/private/subcategories/${item.id}`,
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
          const index = this.subcategories.indexOf(item)
          this.subcategories.splice(index, 1)
        }
      },

      editSubcategory( id ) {
        this.$router.push(`/admin/subcategories/${id}/edit`)
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