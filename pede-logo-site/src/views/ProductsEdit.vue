<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="success"
                  class="cursor-type"
                  large v-on="on"
                  @click="editProduct()"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Produto </span>
            </v-tooltip>
    </template>

    <div class="background-dialog">
       <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title> Editar Produto - {{product.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Salvar</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="10"
            md="10"
          >
            <v-card>
              <form class="pl-5 pr-5 pt-6 pb-6">
                <v-row>
                  <v-col sm="12">
                    <v-select
                      v-model="establishment"
                      required
                      :error-messages="productEstablishmentErrors"
                      @input="$v.establishment.$touch()"
                      @blur="$v.establishment.$touch()"
                      :items="establishments"
                      label="Estabelecimento"
                      single-line
                      item-text="name"
                      item-value="id"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="product.title"
                      :error-messages="productNameErrors"
                      label="Nome do Produto"
                      required
                      @input="$v.product.title.$touch()"
                      @blur="$v.product.title.$touch()"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="product.price"
                      :error-messages="productPriceErrors"
                      label="Preço"
                      required
                      @input="$v.product.price.$touch()"
                      @blur="$v.product.price.$touch()"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-textarea
                      v-model="product.description"
                      :error-messages="productDescriptionErrors"
                      name="input-7-1"
                      label="Descrição do Produto"
                      rows="1"
                      required
                      @input="$v.product.description.$touch()"
                      @blur="$v.product.description.$touch()"
                    ></v-textarea>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="product.details.validate"
                      :error-messages="productDetailsValidateErrors"
                      label="Validade"
                      required
                      @input="$v.product.details.validate.$touch()"
                      @blur="$v.product.details.validate.$touch()"
                    ></v-text-field>
                  </v-col>

                  <v-file-input
                    label="Avatar do Produto"
                    required
                    multiple
                    id="files"
                    ref="files"
                    v-model="files"
                  />
                </v-row>

                <v-row
                  align="center"
                  justify="center"
                >
                  <v-col
                    v-for="(image, index) in product.images" :key="index"
                    cols="12"
                    sm="6"
                    md="3"
                  >
                    <v-img
                      :src="image_url(image.url)"
                      aspect-ratio="1"
                      class="grey lighten-2"
                      max-width="250"
                      max-height="150"
                    />
                  </v-col>

                </v-row>
                <v-row
                  align="center"
                  justify="center"
                >
                  <v-btn class="mr-4" @click="beforeSubmit" color="primary"> Editar </v-btn>
                  <v-btn color="error" @click="dialog = false"> Voltar </v-btn>
                </v-row>

              </form>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

  </v-dialog>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import { securedAxiosInstance } from '../plugins/axios'

  export default {
    mixins: [validationMixin],

    validations: {
      product: {
        title: { required },
        price: { required },
        description: { required },
        details: {
          validate: { required }
        }
      },

      establishment: { required }
    },

    props: ['product_id'],

    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,

        product: {
          title: "",
          price: "",
          description: "",
          details: {
            validate: "",
          },
        },

        establishment: null,
        establishments: [],

        files: []
      }
    },

    mounted () {
      this.getEstablishments()
    },

    computed: {

      productNameErrors() {
        const errors = []
        if (!this.$v.product.title.$dirty) return errors
        !this.$v.product.title.required && errors.push('Insira o nome do Produto.')
        return errors
      },

      productPriceErrors() {
        const errors = []
        if (!this.$v.product.price.$dirty) return errors
        !this.$v.product.price.required && errors.push('Insira o preço do Produto.')
        return errors
      },

      productDescriptionErrors() {
        const errors = []
        if (!this.$v.product.description.$dirty) return errors
        !this.$v.product.description.required && errors.push('Insira a descrição do Produto.')
        return errors
      },

      productDetailsValidateErrors() {
        const errors = []
        if (!this.$v.product.details.validate.$dirty) return errors
        !this.$v.product.details.validate.required && errors.push('Insira a validade do Produto.')
        return errors
      },

      productEstablishmentErrors() {
        const errors = []
        if (!this.$v.establishment.$dirty) return errors
        !this.$v.establishment.required && errors.push('Selecione um estabelecimento.')
        return errors
      }

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
        let data = {
          description: this.product.description,
          details: {
            validate: this.product.details.validate
          },
          id: this.product.id,
          price: this.product.price,
          title: this.product.title
        }

        let formData = new FormData();

        formData.append('product', JSON.stringify(data))
        formData.append('establishment', JSON.stringify(this.establishment))
        formData.append('access_token', localStorage.getItem('access_token'))

        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('images[' + i + ']', file);
        }

        await securedAxiosInstance.patch(`/api/v1/private/products/${this.product_id}`, formData,
          { headers: {
              'Content-Type': 'multipart/form-data',
          } },
        )
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

        if ( response.status == 201 ) {
          this.$v.$reset()
          this.product = {
            title: "",
            price: "",
            description: "",
            details: {
              validate: "",
            },
          },
          this.files = ''
          this.dialog = false
        }

      },

      async editProduct() {
        this.dialog = true
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/products/${this.product_id}`,
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
          this.product = response.data
        }
      },

      image_url( url ) {
        url = "http://" + url
        return url
      },

      async getEstablishments() {
        let response = null

        await securedAxiosInstance.get(`/api/v1/private/establishments_by_user/`,
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
          this.establishments = response.data
        }
      },

    },
  }
</script>

<style scoped>
  .background-dialog {
    background-color:#fafafa;
    height: 100%;
  }

</style>

