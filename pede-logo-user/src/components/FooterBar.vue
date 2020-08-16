<template>
  <v-footer
    dark
    padless
  >
  <v-layout align-center justify-center row fill-height/>
  <v-container>
    <v-row>
      <v-col sm="3" cols="12">
        <h4> Company </h4>
        <div class="style-divider"/>

        <p class="mt-2"> About us </p>
        <p class="redux-margin"> Team </p>
        <p class="redux-margin"> Partners </p>
        <p class="redux-margin"> Investors </p>
        <p class="redux-margin"> Contact Us </p>
        <p class="redux-margin"> Site Map </p>

      </v-col>

      <v-col sm="3" cols="12">
        <h4> Explore </h4>
        <div class="style-divider"/>

        <p class="mt-2"> Buying Options </p>
        <p class="redux-margin"> Selling Options </p>
        <p class="redux-margin"> Realtor Experiance </p>
        <p class="redux-margin"> Realtor Advantage </p>
        <p class="redux-margin"> Neighboorhood Guide </p>
        <p class="redux-margin"> Collections </p>
        <p class="redux-margin"> My Custom Page </p>
      </v-col>

      <v-col sm="3" cols="12">
        <h4> Legal </h4>
        <div class="style-divider"/>

        <p class="mt-2"> Term of Use </p>
        <p class="redux-margin"> Privacy Policy </p>
      </v-col>

      <v-col sm="3"  cols="12">
        <v-row>
          <v-col sm="12">
            <v-icon flat> email </v-icon>
            teste@teste.com
          </v-col>

          <v-col sm="10">
            <v-icon flat> email </v-icon>
            teste@teste.com
          </v-col>

          <v-col sm="12">
            <v-icon flat> email </v-icon>
            teste@teste.com
          </v-col>
        </v-row>


      </v-col>
    </v-row>
  </v-container>



  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }),
  }
</script>

<style scoped>
  .style-divider {
    background-color: #F75A3E;
    padding: 2px;
    margin-top: 10px;
    width: 70%;
  }

  .redux-margin {
    margin-top: -10px;
  }
</style>