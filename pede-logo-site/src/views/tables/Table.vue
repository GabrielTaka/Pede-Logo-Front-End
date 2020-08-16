<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center" >
      <v-col cols="12">

        <v-card color="green" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> {{title}} </h3>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/users" color="blueButtons" dark> Voltar </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <form class="pl-5 pr-5 pb-6 form-config" >
          <v-row>

            <v-col
              cols="12"
              sm="12"
            >
              <v-text-field
                v-model="user.email"
                :error-messages="userEmailErrors"
                label="Email do Profissional"
                required
                type="email"
                @input="$v.user.email.$touch()"
                @blur="$v.user.email.$touch()"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
            >
              <v-text-field
                v-model="user.password"
                :error-messages="userPasswordErrors"
                label="Senha"
                type="password"
                required
                @input="$v.user.password.$touch()"
                @blur="$v.user.password.$touch()"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
            >
              <v-text-field
                v-model="user.password_confirmation"
                :error-messages="userPasswordConfirmationErrors"
                label="Confirmar Senha"
                type="password"
                required
                @input="$v.user.password_confirmation.$touch()"
                @blur="$v.user.password_confirmation.$touch()"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
            >
              <v-select
                v-model="user.role"
                required
                :error-messages="userRoleErrors"
                @input="$v.user.role.$touch()"
                @blur="$v.user.role.$touch()"
                :items="items"
                label="Papel"
                single-line
                item-text="value"
                item-value="role"
              />
            </v-col>

            <v-row
              align="center"
              justify="center"
            >
              <v-btn class="mr-4" @click="beforeSubmit" color="primary"> {{button_action}} </v-btn>
              <v-btn @click="clear" color="error"> Cancelar </v-btn>
            </v-row>

          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { securedAxiosInstance, plainAxiosInstance } from '../../plugins/axios'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      user: {
        email: { required, email },
        password: { required },
        password_confirmation:  { required },
        role: { required }
      }
    },

    components: {},

    mounted() {

      this.user_id = this.$route.params.id
      if( this.user_id) {
        this.edit = true
        this.title = "Editar Profissional"
        this.button_action = "Editar"
        this.getUser()
      }
    },

    data: () => ({
      user: {
        email: '',
        password: '',
        password_confirmation: '',
        role: 1
      },

      edit: false,
      title: "Novo Profissional",
      button_action: "Cadastrar",
      user_id: null,

      items: [
        { value: 'Administrador do Estabelecimento', role: 2},
        { value: 'Profissional do Estabelecimento', role: 3}
      ],

    }),

    computed: {
      userEmailErrors () {
        const errors = []
        if (!this.$v.user.email.$dirty) return errors
        !this.$v.user.email && errors.push('O e-mail não é válido.')
        !this.$v.user.email.required && errors.push('Insira um e-mail.')
        return errors
      },

      userPasswordErrors() {
        const errors = []
        if (!this.$v.user.password.$dirty) return errors
        !this.$v.user.password.required && errors.push('Insira a senha.')
        return errors
      },

      userPasswordConfirmationErrors() {
        const errors = []
        if (!this.$v.user.password_confirmation.$dirty) return errors
        !this.$v.user.password_confirmation.required && errors.push('Confirme a senha.')
        return errors
      },

      userRoleErrors() {
        const errors = []
        if (!this.$v.user.role.$dirty) return errors
        !this.$v.user.role.required && errors.push('Escolha um papel para o usuário.')
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

      async submit() {
        let response = null

        if ( this.edit ) {
          await securedAxiosInstance.patch(`/api/v1/private/users/${this.user_id}`,
            {
              user: this.user,
              access_token: localStorage.getItem('access_token')
            }
          )
          .then((result) => {
            response = result
          }).catch((err) => {
            response = err
          });

        } else {
          await securedAxiosInstance.post('/api/v1/private/users',
            {
              email: this.user.email,
              password: this.user.password,
              password_confirmation: this.user.password_confirmation,
              role: this.user.role
            }
          )
          .then((result) => {
            response = result
          }).catch((err) => {
            response = err
          });
        }

        if ( response.status == 201 ) {
          this.clear()
        }
      },

      clear () {
        this.$v.$reset();
        this.user= {
          email: '',
          password: '',
          password_confirmation: '',
          role: ''
      }

      this.$router.push(`/admin/users`)
    },

    async getUser () {
      let response = null

      await securedAxiosInstance.get(`/api/v1/private/users/${this.user_id}`,
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
        this.user = response.data
        t
        console.log("+++++++++++++++++")
        console.log( this.user )
      }
    }

  }
}
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }

  .form-config {
    background-color: white;
    margin-top: -25px;
  }
</style>