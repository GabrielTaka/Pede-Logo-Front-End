<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center" >
      <v-col cols="12">
        <v-card color="primary" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> {{title}} </h3>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/establishments" color="blueButtons" dark> Voltar </v-btn>
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
              md="12"
            >
              <v-text-field
                outlined
                v-model="category.name"
                :error-messages="categoryNameErrors"
                label="Nome da Categoria"
                required
                @input="$v.category.name.$touch()"
                @blur="$v.category.name.$touch()"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-img
                v-if="edit"
                :src="icon"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="250"
                max-height="150"
              />

              <v-file-input
                outlined
                label="Icone da Categoria"
                v-model="category.icon"
              />
            </v-col>

            <v-row
              align="center"
              justify="center"
            >
              <v-btn class="mr-4" @click="beforeSubmit" color="green" dark>  
                <span v-if="!loading"> {{button_action}} </span> 
                <v-progress-circular v-if="loading" indeterminate color="blue" />
              </v-btn>
              <v-btn @click="clear" color="error"> Cancelar </v-btn>
            </v-row>

          </v-row>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { securedAxiosInstance, plainAxiosInstance } from '../plugins/axios'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      category: {
        name: { required }
      },
    },

    components: {},

    mounted() {
      this.category_id = this.$route.params.id

      if( this.category_id) {
        this.edit = true
        this.title = "Editar Categoria"
        this.button_action = "Editar"
        this.getCategory()
      }
      window.addEventListener("keypress", e => {
        if (e.keyCode == 13 ) {
        this.beforeSubmit()
        }
	    });
    },

    data: () => ({
      category: {
        name: '',
        icon: []
      },

      edit: false,
      title: "Nova Categoria",
      button_action: "Cadastrar",
      current_avatar: '',
      current_cover: '',
      category_id: null,
      icon: [],
      loading: false

    }),

    computed: {
      categoryNameErrors() {
        const errors = []
        if (!this.$v.category.name.$dirty) return errors
        !this.$v.category.name.required && errors.push('Insira o nome da Categoria.')
        return errors
      },
    },

    methods: {
      handleFilesUploads() {
        this.files = this.$refs.files.files;
      },

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
        this.loading = true

        let formData = new FormData();
        formData.append('category', JSON.stringify(this.category.name))
        formData.append('icon', this.category.icon)
        formData.append('access_token', localStorage.getItem('access_token'))

        if ( this.edit ) {
          await securedAxiosInstance.patch(`/api/v1/private/category_types/${this.category_id}`, formData,
            { headers: {
              'Content-Type': 'multipart/form-data',
            } },
          )
          .then((result) => {
            response = result
          }).catch((err) => {
            response = err
          });

        } else {
          await securedAxiosInstance.post(`/api/v1/private/category_types`, formData,
            { headers: {
              'Content-Type': 'multipart/form-data',
            } },
          )
          .then((result) => {
            response = result
          }).catch((err) => {
            response = err
          });
        }

        if ( response.status == 200 ) this.$router.push(`/admin/categories`);
        this.loading = false
      },

    clear () {
      this.$v.$reset();
      this.$router.push(`/admin/categories`)
    },

    async getCategory () {
      let response = null

      await securedAxiosInstance.get(`/api/v1/private/category_types/${this.category_id}`,
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
        this.category = response.data
        this.icon = this.category.icon
        this.category.icon = null
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