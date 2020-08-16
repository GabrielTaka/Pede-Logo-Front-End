<template>
  <v-container>
    <h2 class="mt-10 mb-5"> Listagem de estabelecimentos </h2>

    <v-card>
      <v-row>
        <v-col sm="4" cols="12">
          <v-img :src="establishment.avatar" class="size-img"/>
        </v-col>

        <v-col sm="4" cols="12">
          <p> <strong> {{establishment.name}} </strong> </p>
          <p> {{establishment.details.business_hours_start}} - {{establishment.details.business_hours_end}}  </p>
          <p> {{establishment.details.phone}} - {{establishment.address.neighborhood}} </p>
          <p> {{establishment.details.description}} </p>
        </v-col>

        <v-col sm="4" cols="12">
          <p> Quantidade de produtos: {{establishment.num_products}} </p>

          <v-chip v-for="(category,index) in establishment.category_types" :key="index" color="success"> 
            {{category.name}}
          </v-chip>
        </v-col>
      </v-row>
    </v-card>

    <h2 class="mt-10"> Listagem de produtos </h2>
    <p> Clique no produto para realizar seu pedido </p>

     <v-data-table
      :headers="headers"
      :items="products"
      :items-per-page="15"
      class="elevation-1"
    >

      <template v-slot:item.image="{ item }">
        <v-img :src="item.images[0].url" class="size-avatar"/>
      </template>

      <template v-slot:item.name="{ item }">
        {{item.name}}
      </template>

      <template v-slot:item.details.duration="{ item }">
        {{item.details.duration}}
      </template>

      <template v-slot:item.price="{ item }">
        {{item.price}}
      </template>

      <template v-slot:item.action="{ item }">
        <v-icon @click="selectItem( item )"> mdi-food </v-icon>
      </template>
    
    </v-data-table>

    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Produto: {{ selectedItem.description }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            outlined
            class="mt-5"
            label="Selecione a quantidade do produto"
            v-model="productQuantity"
          />

          <v-alert type="success" v-if="showAlert"> 
            Pedido realizado com sucesso
          </v-alert>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            
            @click="sendRequest()"
          >
            Realizar Pedido
          </v-btn>
          <v-btn
            color="error"
            text
            @click="close()"
          >
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-btn class="mt-10 mb-10 full-width" color="blue" dark v-if="!logged"> Realize o Login para efetuar o pedido. </v-btn>
  </v-container>
</template>

<script>
  import EstablishmentRepository from '@/repository/EstablishmentRepository'
  import CategoriesRepository from '@/repository/CategoriesRepository'

  export default {
    data() {
      return {
        establishment: {},
        products: [],
         headers: [
          { text: 'Produto', align: 'start', sortable: false, value: 'image' },
          { text: 'Nome', value: 'description' },
          { text: 'Tempo de preparo', value: 'details.duration' },
          { text: 'Preço R$', value: 'price' },
          { text: 'Pedir', value: 'action' },
          
        ],
        selectedItem: {},
        dialog: false,
        productQuantity: 1,
        showAlert: false
      }
    },

    computed: {
      hasEstablishments() {
        if ( this.establishments.length == 0 ) return true 
        else return false 
      },

      logged() {
        if ( localStorage.getItem('logged') == 'true') {
          return true 
        } else {
          return false
        }
      }
    },

    created() {
      this.getEstablishment();
      
    },

    methods: {
      async getEstablishment () {
        let response = await EstablishmentRepository.show( this.$route.params.id );
        this.establishment = response.data
        this.products = this.establishment.products
      },

      selectItem ( item ) {
        this.selectedItem = item;
        this.dialog = true;
      },

      async sendRequest () {
        let formData = new FormData()

        let scheduling = {
          establishment_id: this.establishment.id,
          product_id: this.selectedItem.id,
          quantity: this.productQuantity
        }

        formData.append('scheduling', JSON.stringify(scheduling))
        let response = await EstablishmentRepository.create( formData );
        this.showAlert = true
      },

      close() {
        this.dialog = false 
        this.showAlert = false
      }
    }
  } 
</script>


<style scoped>
  .no-item-style {
    border: 4px #F75A3E solid;
    border-radius: 5px;;
    margin-bottom: 100px;
  }

  .icon-size {
    font-size: 200px !important;
  }

  .size-img {
    height: 200px;
  }

  .size-avatar {
    width: 50px;
    border-radius: 50%;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .full-width {
    width: 100%;
  }
</style>