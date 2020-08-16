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
              <h3 class="title font-weight-light"> Produto </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize Produtos cadastrados </h4>
            </v-col>

            <v-col cols="2">
              <!-- <product-new v-on:reload="reloadProcuts"/> -->
              <v-btn color="blueButtons" dark to="/admin/products/new"> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="products"
          class="none-background"
          :loading="isLoading" 
          loading-text="Carregando dados... Porfavor aguarde"
        >
          <template v-slot:item.title="{ item }">
            {{item.title}}
          </template>

          <template v-slot:item.price="{ item }">
            R$ {{item.price}}
          </template>

          <template v-slot:item.description="{ item }">
            {{item.description}}
          </template>


          <!-- <template v-slot:item.establishment="{ item }">
            <v-chip
              color="primary"
              dark
            >
              {{ item.establishment.name }}
            </v-chip>
          </template>

          <template v-slot:item.category="{ item }">
            <v-chip
              v-for="(category_type, index) in item.category_types"
              :key="index"
              color="primary"
              dark
            >
              {{ category_type.name }}
            </v-chip>
          </template> -->

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteProduct( item )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Excluir Produto </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="green"
                  class="cursor-type"
                  large v-on="on"
                  @click="editProduct( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Produto </span>
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
      ProductNew: () => import('@/views/ProductsNew'),
      ProductEdit: () => import('@/views/ProductsEdit'),
    },

        computed: {
      ...mapState( ['currentUser'] ),  
    },

    mounted() {
      this.getProducts()
    },

    data: () => ({
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      products: [],
      error: false,
      isLoading: false,

      headers: [
        {
          sortable: false,
          text: 'Preço (R$)',
          value: 'price'
        },
        {
          sortable: false,
          text: 'Nome',
          value: 'description'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getProducts() {
        let response = null
        this.isLoading = true

        await securedAxiosInstance.get(`/api/v1/private/products`,
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
          this.products = response.data
          console.log("++++++++++++++++++++")
          console.log( this.products )
          console.log("++++++++++++++++++++")
        } else {
          this.error = true
        }
        this.isLoading = false
      },

      async deleteProduct( item ) {
        let response = null

        await securedAxiosInstance.delete(`/api/v1/private/products/${item.id}`,
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
          const index = this.products.indexOf(item)
          this.products.splice(index, 1)
        }
      },


      editProduct( id ) {
        this.$router.push(`/admin/products/${id}`)
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