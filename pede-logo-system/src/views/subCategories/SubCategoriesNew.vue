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
              <v-btn to="/admin/establishments" color="blueButtons" dark> Voltar </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12">
        <form class="pl-5 pr-5 pb-6 form-config" >
          <v-row>
						<v-col cols="12" sm="12" md="12">
							<v-select
								v-model="category_type"
                required
                :items="category_types"
                label="Categorias"
                single-line
                item-text="name"
                item-value="id"
                :error-messages="subCategoryFatherErrors"
                @input="$v.category_type.$touch()"
                @blur="$v.category_type.$touch()"
                return-object
              />
						</v-col>
            <v-col
              cols="12"
              sm="12"
              md="12"
            >
              <v-text-field
                v-model="subCategory.name"
                :error-messages="subCategoryNameErrors"
                label="Nome da subcategoria"
                required
                @input="$v.subCategory.name.$touch()"
                @blur="$v.subCategory.name.$touch()"
              ></v-text-field>
            </v-col>

            <v-row
              align="center"
              justify="center"
            >
              <v-btn class="mr-4" @click="beforeSubmit" color="primary"> 
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
  import { securedAxiosInstance, plainAxiosInstance } from '../../plugins/axios'
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      subCategory: {
        name: { required },
      },
      category_type: { required }
    },

    components: {},

    mounted() {
      this.subcategory_id = this.$route.params.id

      if( this.subcategory_id) {
        this.edit = true
        this.title = "Editar subcategoria"
        this.button_action = "Editar"
        this.getsubCategory( this.subcategory_id )
      }
      window.addEventListener("keypress", e => {
        if (e.keyCode == 13 ) {
          this.beforeSubmit()
        }
	    });
    },

    data: () => ({
      subCategory: { name: null },
      category_type: undefined,
      
      edit: false,
      title: "Nova subcategoria",
      button_action: "Cadastrar",
      subcategory_id: null,
			category_types: [],
      loading: false

    }),

    computed: {
      subCategoryNameErrors() {
        const errors = []
        if (!this.$v.subCategory.name.$dirty) return errors
        !this.$v.subCategory.name.required && errors.push('Insira o nome da subcategoria.')
        return errors
      },

      subCategoryFatherErrors() {
        const errors = []
        if (!this.$v.category_type.$dirty) return errors
        !this.$v.category_type.required && errors.push('Selecione uma categoria.')
        return errors
      },

    },

		created() {
			this.getCategoryTypes();
		},

    methods: {

			async getCategoryTypes () {
				let response = null 

				await securedAxiosInstance.get(`/api/v1/private/category_types`,
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
					this.category_types = response.data
				}
			},

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
        formData.append('subCategory', JSON.stringify(this.subCategory))
        formData.append('category_type', JSON.stringify(this.category_type))
        formData.append('access_token', localStorage.getItem('access_token'))

        if ( this.edit ) {
          await securedAxiosInstance.patch(`/api/v1/private/subcategories/${this.subcategory_id}`, formData,
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
          await securedAxiosInstance.post(`/api/v1/private/subcategories`, formData,
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

        if ( response.status == 200 ) this.$router.push(`/admin/subcategories`)
        this.loading = false
      },

    clear () {
      this.$v.$reset();
      this.$router.push(`/admin/categories`)
    },

    async getsubCategory ( id ) {
      let response = null

      await securedAxiosInstance.get(`api/v1/private/subcategories/${id}`,
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
        this.subCategory = response.data
        this.category_type = response.data.category_type
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