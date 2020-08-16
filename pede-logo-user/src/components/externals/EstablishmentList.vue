<template>
  <v-container>
    <h2 class="mt-10 mb-5"> Listagem de estabelecimentos </h2>

    <v-autocomplete
      class="mt-5 mb-5"
      v-model="category_id"
      :items="categories"
      outlined
      chips
      small-chips
      item-text="name"
      item-value="id"
      label="Selecione uma categoria desejada"
      @change="getEstablishmentByCategory()"
    ></v-autocomplete>

    <div v-if="hasEstablishments" class="px-10 py-10 no-item-style">
      <center>
        <h3> Que pena parece que não encontramos nenhum estabelecimento com as características selecionada.</h3>

        <v-icon class="icon-size"> mdi-emoticon-cry-outline </v-icon>

      </center>
    </div>

    <v-card v-for="(establishment, index) in establishments" :key="index" class="mt-5" @click="goTo(establishment.id)">
      <v-row>
        <v-col sm="4" cols="12">
          <v-img :src="establishment.avatar" class="size-img"/>
        </v-col>

        <v-col sm="4" cols="12">
          <p> <strong> {{establishment.name}} </strong> </p>
          <p>  {{establishment.details.business_hours_start}} - {{establishment.details.business_hours_end}}  </p>
          <p>  {{establishment.details.phone}} - {{establishment.address.neighborhood}} </p>
          <p>  {{establishment.details.description}} </p>
        </v-col>

        <v-col sm="4" cols="12">
          <p> Quantidade de produtos: {{establishment.num_products}} </p>

          <v-chip v-for="(category,index) in establishment.category_types" :key="index" color="success"> 
            {{category.name}}
          </v-chip>
        </v-col>
      </v-row>
      
    </v-card>
  </v-container>
</template>

<script>
  import EstablishmentRepository from '@/repository/EstablishmentRepository'
  import CategoriesRepository from '@/repository/CategoriesRepository'

  export default {
    data() {
      return {
        establishments: [],
        categories: [],
        category_id: null
      }
    },

    computed: {
      hasEstablishments() {
        if ( this.establishments.length == 0 ) return true 
        else return false 
      }
    },

    created() {
      this.getEstablishment();
      this.getCategories();
    },

    methods: {
      async getEstablishment () {
        let response = await EstablishmentRepository.listAll();
        this.establishments = response.data
      },

      async getCategories () {
        let response = await CategoriesRepository.list();
        this.categories = response.data
      },

      async getEstablishmentByCategory () {
        this.establishments = []
        let response = await EstablishmentRepository.listByCategory( this.category_id);
        this.establishments = response.data
      },

      goTo( id ) {
        this.$router.push(`/establishments/${id}`)
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
</style>