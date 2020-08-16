<template>
  <v-app id="inspire">

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <div class="pl-5 pr-5 position-top-card">
                <v-card
                  class="primary pa-10"
                  align="center"
                  justify="center"
                >
                  <h2 class="white--text"> ADM GERAL </h2>
                </v-card>
              </div>

              <v-card-text class="position-card-form">
                <v-form>

                  <v-alert type="error" v-if="error">
                    Erro ao fazer login, confira seus dados.
                  </v-alert>

                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="username"
                    required
                    outlined
                    :error-messages="emailErrors"
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                  />

                  <v-text-field
                    outlined
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    required
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="blue" dark @click="beforeSubmit"> 
                  <span v-if="!loading"> Cadastrado  </span> 
                  <v-progress-circular v-if="loading" indeterminate color="blue" />
                </v-btn>
                
                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import { plainAxiosInstance } from '../plugins/axios'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'
  import axios from 'axios'

  export default {
    mixins: [validationMixin],

    validations: {
      username: { required},
      password: { required },
    },

    components: {
      CoreView: () => import('@/components/core/AppBarExternal')
    },
    props: {
      source: String,
    },

    mounted() {
      window.addEventListener("keypress", e => {
        if (e.keyCode == 13 ) {
          this.beforeSubmit()
        }
	    });
    },

    data() {
      return {
        username: '',
        password: '',
        error: false,
        loading: false
      }
    },

    computed: {
      emailErrors () {
        const errors = []
        if (!this.$v.username.$dirty) return errors
        !this.$v.username.required && errors.push('Insira o e-mail.')
        return errors
      },

      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Insira a senha.')
        return errors
      },
    },


    methods: {
      beforeSubmit() {
        this.$v.$touch()

        if ( this.$v.$invalid) {
          return
        } else {
          this.submit()
        }
      },

      async submit () {
        let resp = null
        this.loading = true

        await axios.post(`${process.env.VUE_APP_BASE_API_URL}/oauth/token`,
        {
          username: this.username,
          password: this.password,
          grant_type: 'password',
          origin: 'system_admin'
        })
        .then(function (response) {
          resp = response
          let today = new Date();
        })
        .catch(function (error) {
          resp = error
        });


        if( resp.status == 200 ) {
          let today = new Date();

          let time = {
            hours: today.getHours() + 2,
            minutes: today.getMinutes()
          }

          localStorage.setItem( 'access_token', resp.data.access_token )
          localStorage.setItem( 'created_at', resp.data.created_at )
          localStorage.setItem( 'expires_day', (today.getDate() ) )
          localStorage.setItem( 'expires_hour', (today.getHours() + 2) )
          localStorage.setItem( 'expires_minute', (today.getMinutes()) )
          localStorage.setItem( 'token_type', resp.data.token_type )
          localStorage.setItem( 'logged', 'true' )
          this.$router.go()
        } else {
          this.error = true
        }

        this.loading = false
      },
    }
  }
</script>

<style scoped>
  .position-top-card {
    position: relative;
    top: -50px;
  }

  .position-card-form {
    position: relative;
    top: -20px;
  }
</style>