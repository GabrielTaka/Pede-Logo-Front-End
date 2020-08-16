<template>
  <div id="app">
    <div class="home-landing-image">
      <v-row >
        <div class="search-specification ">
          <h1 id="title-first" class="display-2">Seja Bem</h1>
          <h1 id="subtitle-first" class="tilted-page ml-10 pl-5 display-2 pr-10 white--text"> Vindo. </h1>
          <h3 class="mt-5 ml-10"> Deu fome? PEDE LOGO </h3>
        </div>
        
      </v-row>
    </div>

    <div class="div-orange">
      <v-row>
        <v-col cols="12" sm="6" class="margin-redux">
          <v-carousel
            cycle
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(slide, i) in slides"
              :key="i"
            >
              <v-sheet
                height="100%"
                @click="goTo(`/establishments/${slide.id}`)"
              >
                <v-row
                  class="fill-height"
                  align="center"
                  justify="center"
                >
                  <v-img class="height-avatar" :src="slide.avatar" />
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-col>

        <v-col cols="12" sm="6">
          <div class="margin-div">
            <center>
              <h2 class="white--text"> PEDE LOGO </h2>
              <p class="white--text"> Realize seus pedidos com segurança e velocidade. </p>
              <v-btn rounded outlined to="/establishments">  Visualizar estabelecimentos </v-btn>
            </center>
          </div>
        </v-col>
      </v-row>
    </div>

    <div class="px-5">
      <v-row>
        <v-col cols="10" offset="1">
          <v-row>

            <v-col class="text-center" cols="12" md='4'>
              <v-card tile class="card">

                <div class="card_container">
                  <v-icon class="icon-size pt-5"> mdi-shield-check-outline </v-icon>
                  <center>
                    <p class="style-title"> Peça com segurança </p>
                  </center>
                </div>
              </v-card>
            </v-col>


            <v-col class="text-center" cols="12" md='4'>
              <v-card tile class="card">

                <div class="card_container">
                  <v-icon class="icon-size pt-5"> mdi-clock-fast </v-icon>
                  <center>
                    <p class="style-title"> Peça com velocidade </p>
                  </center>
                </div>
              </v-card>
            </v-col>

            <v-col class="text-center" cols="12" md='4'>
              <v-card tile class="card">
                <div class="card_container">
                  <v-icon class="icon-size pt-5"> mdi-food </v-icon>
                  <center>
                    <p class="style-title"> Com uma enorme variedade de produtos </p>
                  </center>
                </div>
              </v-card>
            </v-col>

          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  import { Hooper, Slide } from 'hooper';
  import 'hooper/dist/hooper.css';

  import CitiesRepository from '../../repository/CitiesRepository'
  import PropertiesRepository from '../../repository/PropertiesRepository'
  import EstablishmentRepository from '../../repository/EstablishmentRepository'

  export default {
    components: { Hooper, Slide },
    data() {
      return {
        
         slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],

        window: {
          width: 0,
          height: 0
        },
        pwa: false,
      }
    },

    created() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },

    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },

    mounted() {
      this.listEstablishment()
    },

    methods: {
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        if( this.window.width <= 600 )  this.pwa = true;
        else this.pwa = false
      },


      async listEstablishment () {
        let response = await EstablishmentRepository.list();
        this.slides = response.data
        console.log( this.slides)
      },


      goTo ( route) {
        this.$router.push( route )
      }
    }

  }
</script>

<style scoped>
  .home-landing-image {
    background-image: url('../../images/home/foodBack.jpg');
    background-size: cover;
    height: 600px !important;
    min-height: 300px;
  }
  
  .search-specification {
    position: absolute;
    margin-top: 15%;
    left: 10%;
    text-align: left;
  }

  .search-filter {
    position: absolute;
    margin-top: 22.7%;
    left: 15%;
    text-align: left;
  }

  .welcome-text-orange {
    background-color: #F75A3E;
  }

  .card {
    box-shadow: 1px 1px 10px -2px rgba(0,0,0,0.75);
    height: 100%;
  }

  .card-container {
    max-height: 100%
  }

  .card-background {
    position: relative;
    margin: 0 auto;
    width: 60%;
    height: 50%;
  }

  .card-background > img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
  }

  .card-subtitle {
    position: absolute;
  }

  .gallery-height {
    max-height: 200px;
  }

  .gallery-photo {
    display: block;
    margin: 3%;
    border-radius: 7px;
    width: 100%;
    height: 100%;
  }

  .home-advertise-image > img {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .home-advertise-image {
    height: 600px;
    width: 100%;
  }

  .free-list-image {
    height: 500px;
    background-image: url('../../images/home/anuncia-gratis.png');
    background-size: cover;
  }

  .home-advertise {
    position: absolute;
    margin-top: 8%;
    right: 5%;
    text-align: left;
  }

  .zudah-default-color {
    color: #F75A3E;
  }

  .v-select-zudah {
    text-color: #F75A3E;
  }

  .tilted-page {
    background: linear-gradient(60deg, #F75A3E 80%, transparent 25%)
  }

  .search-container {
    background-color:rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    webkit-box-shadow: 2px -1px 10px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px -1px 10px -1px rgba(0,0,0,0.75);
    box-shadow: 2px -1px 10px -1px rgba(0,0,0,0.75);
    width: 100%;
    max-width: 500px;
  }

  .custom-select {
    padding-bottom: -200px !important;
    width: 500px;
  }

  @media only screen and (max-width: 1200px) {
    .search-filter {
      margin-top: 25%;
    }

    .home-landing-image > img {
      height: 700px;
    }
  }

  @media only screen and (max-width: 1000px) {
    .search-filter {
      margin-top: 30%;
    }
  }

  @media only screen and (max-width: 680px) {
    .search-specification {
      margin-top: 5%;
    }

    .search-filter {
      margin-top: 25%;
    }

    .home-landing-image {
      height: 100% !important;
      width: 100% !important;
    }
  }

  @media only screen and (max-width: 775px) {
    .custom-select {
      width: 300px;
    }

    .width-row {
      width: 500px !important;
    }

    .home-landing-image > img {
      height: 600px;
    }
  }

  @media only screen and (max-width: 599px) {
    .positio-col {
      top: -40px !important;
    }

    .style-button-search {
      left: 1px !important;
      top: -20px !important;
    }

    .width-row {
      width: 400px !important;
    }

    .cities-autocomplete {
      width: 400px !important;
    }

    .search-response {
      width: 100% !important;
      position: relative;
      top: -45px;
    }

    .size-title {
      font-size: 25px !important;
      
    }
  }



  @media only screen and (max-width: 550px) {
    .custom-select {
      width: 400px;
    }

    .width-row {
      width: 350px !important;
    }
  }

  @media only screen and (max-width: 470px) {
    .cities-autocomplete {
      width: 300px !important;
    }
  }

  
  @media only screen and (max-width: 450px) {
    .custom-select {
      width: 200px;
      height: 60px !important;
    }

    #title-first {
      font-size: 20px !important;
      position: relative;
      top: -20px;
    }

    .width-row {
      width: 300px !important;
    }

    #subtitle-first {
      font-size: 20px !important;
      position: relative;
      top: -35px;
      left: -20px;
    }

    .search-filter {
      margin-top: 20%;
    }
  }

  @media only screen and (max-width: 390px) {
    .custom-select {
      width: 200px;
      height: 60px !important;
    }

    .cities-autocomplete {
      width: 250px !important;
    }

    #title-first {
      font-size: 20px !important;
      position: relative;
      top: -20px;

    }

    .width-row {
      width: 250px !important;
    }

    #subtitle-first {
      font-size: 20px !important;
      position: relative;
      top: -35px;
      left: -20px;
    }

    .search-filter {
      margin-top: 20%;
    }
  }

  .field-style {
    color: rgb(48, 48, 48);
    position: relative;
    top: -20px;
    cursor: pointer;
  }

  .width-row {
    width: 600px;
  }

  .space-check {
    margin-bottom: -15px;
  }

  .position-row {
    position: relative;
    top: -20px;
  }

  .positio-col {
    position: relative;
    top: -10px;
  }

  .style-button-search {
    background-color: #F75A3E !important;
    -webkit-box-shadow: 2px 2px 9px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 2px 9px 0px rgba(0,0,0,0.75);
    box-shadow: 2px 2px 9px 0px rgba(0,0,0,0.75);
    font-weight: 500;
    position: relative;
    top: -50px;
  }


  @media only screen and (max-width: 800px) {
    .headline {
      font-size: 18px !important;
    }

    .display-2 {
      font-size: 25px !important;
    }


    .img-size {
      height: 100px !important;
    }
  }

  .response-complete {
    margin-top: -15px;
  }

  .position-col-relative {
    position: relative;
    left: 10px;
  }

  .background-test {
    background-color: red !important;
  }

  .div-orange {
    background-color: #F75A3E !important;
    height: 400px;
  }

  .margin-div {
    margin-top: 100px;
  }

  .margin-redux {
    margin-top: -12px;
  }

  .icon-size {
    font-size: 100px !important;
    color: #F75A3E !important;
  }

  .style-title {
    font-size: 20px;
    margin-top: 20px;
  }

  .height-avatar {
    height: 100% !important;
  }
</style>
