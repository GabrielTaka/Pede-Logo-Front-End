<template>
  <div>
    <v-toolbar class="background-toolbar">
      <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp" class="background-brand" @click="redirectToHome()">
        <v-icon class="hamburguer" @click.stop="drawer = !drawer" v-if="pwa"> menu </v-icon>
        <span class="style-itens"> PEDE LOGO </span>
      </v-toolbar-items>

      <v-toolbar-items v-if="!$vuetify.breakpoint.smAndUp" class="background-brand" @click="redirectToHome()">
        <v-icon class="hamburguer" @click.stop="drawer = !drawer" v-if="pwa"> menu </v-icon>
      </v-toolbar-items>

      <v-spacer/>

      <v-toolbar-items v-if="!pwa">
        <span class="style-itens" flat @click="goTo('/establishments')">
          Estabelecimentos
        </span>

        <span class="style-itens" flat @click="goTo('/my-orders')">
          Meus Pedidos
        </span>
      </v-toolbar-items>

      <v-btn class="background-toolbar shadow-button" @click="signout()" dark>
        Sign Out
      </v-btn>
  
    </v-toolbar> 

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >

      <v-list dense>
        <v-list-item link @click="goTo('/')">
          <v-list-item-icon>
            <v-icon> mdi-home </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> Home </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="goTo('/career')">
          <v-list-item-icon>
            <v-icon> mdi-account-box-outline </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> Estabelecimentos </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link @click="goTo('/sign-in')">
          <v-list-item-icon>
            <v-icon> mdi-login-variant </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title> Sign Out </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>

export default {
  data() {
    return {
      drawer: null,
      window: {
        width: 0,
        height: 0
      },
      pwa: false,

      items: [
          { title: 'Home', icon: 'dashboard' },
          { title: 'About', icon: 'question_answer' },
        ],

    }
  },

  computed: {},

  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },

  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    redirectToHome() {
      this.$router.push("/")
    },

    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;

      if( this.window.width <= 885 ) {
        this.pwa = true;
        console.log(this.pwa)
      } else {
        this.pwa = false;
        console.log( this.pwa)
      }
    },

    goTo( route ) {
      this.$router.push( route )
    },

    signout() {
      localStorage.setItem( 'logged', 'false' );
      window.location.href = '/'
      
    }
  }
}

</script>

<style scoped lang="scss">
  .style-component {
    font-weight: bold;
    padding-right: 5px;
    border-right: 1px solid white !important;
  }

  .img-brand {
    width: 100px;
    height: 35px;
    margin-top: 15px;
  }

  .background-brand {
    background-color: #F75A3E;
    padding-left: 20px;
    padding-right: 20px;
    position: relative;
    left: -20px;
  }

  .background-toolbar {
    background-color: #F75A3E !important;
  }

  .style-itens {
    color: white;
    font-weight: 500;
    margin-right: 20px;
    margin-top: 20px;
  }


  .shadow-button {
    -webkit-box-shadow: 2px 2px 9px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 2px 2px 9px 0px rgba(0,0,0,0.75);
    box-shadow: 2px 2px 9px 0px rgba(0,0,0,0.75);
    font-weight: 500;
  }

</style>
