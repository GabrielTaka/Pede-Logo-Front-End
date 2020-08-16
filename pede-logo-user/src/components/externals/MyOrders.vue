<template>
  <v-container>
    <h1 class="mt-5 mb-5"> Meu pedidos </h1> 
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="15"
      class="elevation-1 mb-5 mt-5"
    >

    </v-data-table>
  </v-container>
</template>

<script>
  import EstablishmentRepository from '@/repository/EstablishmentRepository'


  export default {
    data() {
      return {
        orders: [],
        headers: [
          { text: 'Produto', value: 'product.description', },
          { text: 'Preço R$', value: 'product.price' },
          { text: 'Estabelecimento', value: 'establishment.name' },
          { text: 'Status', value: 'status' },
        ],
      }
    },


    mounted() {
      this.getOrders()
    },

    methods: {
      async getOrders() {
        let response = await EstablishmentRepository.showOrders()
        this.orders = response.data
        console.log( )
      }
    }
  }
</script>