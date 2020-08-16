<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center" >
      <v-col cols="12" v-if="!from_establishment">

        <v-card color="primary" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> {{title}} </h3>
            </v-col>

            <v-col cols="2">
              <v-btn to="/admin/establishments" color="blueButtons" dark> Voltklklar </v-btn>
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
              md="6"
            >
              <v-img
                v-if="edit"
                :src="current_avatar"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="250"
                max-height="150"
              />

              <v-file-input
              outlined
                label="Avatar do Estabelecimento"
                v-model="avatar"
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-img
                
                v-if="edit"
                :src="current_cover"
                aspect-ratio="1"
                class="grey lighten-2"
                max-width="250"
                max-height="150"
              />

              <v-file-input
                outlined
                label="Capa do Estabelecimento"
                v-model="cover"
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.name"
                :error-messages="establishmentNameErrors"
                label="Nome do Estabelecimento"
                required
                @input="$v.establishment.name.$touch()"
                @blur="$v.establishment.name.$touch()"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.document"
                :error-messages="establishmentDocumentErrors"
                label="Documento"
                required
                @input="$v.establishment.details.document.$touch()"
                @blur="$v.establishment.details.document.$touch()"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="3">
              <v-text-field
                outlined
                v-model="establishment.details.business_hours_start"
                :error-messages="establishmentBusinessHoursStartErrors"
                name="input-7-1"
                label="Horário de Abertura"
                rows="2"
                required
                @input="$v.establishment.details.business_hours_start.$touch()"
                @blur="$v.establishment.details.business_hours_start.$touch()"
                v-mask="hourMask"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="12" md="3">
              <v-text-field
                outlined
                v-model="establishment.details.business_hours_end"
                :error-messages="establishmentBusinessHoursEndErrors"
                name="input-7-1"
                label="Horário de Fechamento"
                rows="2"
                required
                @input="$v.establishment.details.business_hours_end.$touch()"
                @blur="$v.establishment.details.business_hours_end.$touch()"
                v-mask="hourMask"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-textarea
                outlined
                v-model="establishment.details.description"
                :error-messages="establishmentDescriptionErrors"
                name="input-7-1"
                label="Descrição"
                rows="2"
                required
                @input="$v.establishment.details.description.$touch()"
                @blur="$v.establishment.details.description.$touch()"
              ></v-textarea>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.slogan"
                label="Slogan"
                type="text"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.email"
                label="E-mail"
                type="email"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.site"
                label="Site"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.phone"
                :error-messages="establishmentPhoneErrors"
                label="Telefone"
                v-mask="phoneMask"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="address.cep"
                :error-messages="addressCepErrors"
                label="CEP"
                required
                @input="$v.address.cep.$touch()"
                @blur="$v.address.cep.$touch(), getAddressByCEP()"
                v-mask="cepMask"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="address.city"
                label="Cidade"
                disabled
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="address.neighborhood"
                label="Bairro"
                disabled
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="address.street"
                label="Rua"
                disabled
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="address.number"
                label="Número"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="address.complement"
                label="Complemento"
                disabled
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.facebook"
                label="Facebook"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.instagram"
                label="Instagram"
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              sm="12"
              md="6"
            >
              <v-text-field
                outlined
                v-model="establishment.details.twitter"
                label="Twitter"
              ></v-text-field>
            </v-col>

            <v-row
              align="center"
              justify="center"
            >
              <v-btn class="mr-4" @click="beforeSubmit" color="green" dark>  
                <span v-if="!loading"> {{button_action}}</span> 
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
      establishment: {
        name: { required },
        details: {
          document: { required },
          business_hours_start: { required },
          business_hours_end: { required },
          description: { required },
          email: { required },
          phone: { required }
        }
      },

      address: {
        cep: { required },
        city: { required },
      },
    },

    components: {},

    props: ['from_establishment'],

    mounted() {
      this.establishment_id = this.$route.params.id
      if( this.establishment_id) {
        this.edit = true
        this.title = "Editar Estabelecimento"
        this.button_action = "Editar"
        this.getEstablishment()
      }
      window.addEventListener("keypress", e => {
        if (e.keyCode == 13 ) {
          this.beforeSubmit()
        }
	    });
    },

    data: () => ({
      establishment: {
        name: '',
        details: {
          document: '',
          business_hours_start: '',
          business_hours_end: '',
          description: '',
          email: '',
          site: '',
          facebook: '',
          instagram: '',
          twitter: '',
          phone: '',
        }
      },

      address: {
        cep: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        complement: '',
        uf: ''
      },

      avatar: [],
      cover: [],
      editAddress: false,
      loadingAddress: false,
      establishment_id: null,
      edit: false,
      title: "Novo Estabelecimento",
      button_action: "Cadastrar",
      current_avatar: '',
      current_cover: '',
      phoneMask:'(##)####-####',
      hourMask: 'XX:XX',
      cepMask: 'XXXXX-XXX',
      loading: false

    }),

    computed: {
      establishmentNameErrors() {
        const errors = []
        if (!this.$v.establishment.name.$dirty) return errors
        !this.$v.establishment.name.required && errors.push('Insira o nome do Estabelecimento.')
        return errors
      },

      establishmentDocumentErrors() {
        const errors = []
        if (!this.$v.establishment.details.document.$dirty) return errors
        !this.$v.establishment.details.document.required && errors.push('Insira o documento do Estabelecimento.')
        return errors
      },

      establishmentBusinessHoursStartErrors() {
        const errors = []
        if (!this.$v.establishment.details.business_hours_start.$dirty) return errors
        !this.$v.establishment.details.business_hours_start.required && errors.push('Insira o Horário de Abertura do Estabelecimento.')
        return errors
      },

      establishmentBusinessHoursEndErrors() {
        const errors = []
        if (!this.$v.establishment.details.business_hours_end.$dirty) return errors
        !this.$v.establishment.details.business_hours_end.required && errors.push('Insira o Horário de Fechamento do Estabelecimento.')
        return errors
      },

      establishmentDescriptionErrors() {
        const errors = []
        if (!this.$v.establishment.details.description.$dirty) return errors
        !this.$v.establishment.details.description.required && errors.push('Insira uma descrição para o Estabelecimento.')
        return errors
      },

      establishmentPhoneErrors() {
        const errors = []
        if (!this.$v.establishment.details.phone.$dirty) return errors
        !this.$v.establishment.details.phone.required && errors.push('Insira o número do Estabelecimento.')
        return errors
      },

      addressCepErrors() {
        const errors = []
        if (!this.$v.address.cep.$dirty) return errors
        !this.$v.address.cep.required && errors.push('Insira o cep do Estabelecimento.')
        return errors
      },

      addressCityErrors() {
        const errors = []
        if (!this.$v.address.city.$dirty) return errors
        !this.$v.address.city.required && errors.push('Insira a cidade do Estabelecimento.')
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
        this.loading = true

        let formData = new FormData();
        formData.append('establishment', JSON.stringify(this.establishment))
        formData.append('address', JSON.stringify(this.address))
        formData.append('cover', this.cover)
        formData.append('avatar', this.avatar)
        formData.append('access_token', localStorage.getItem('access_token'))

        if ( this.edit ) {
          await securedAxiosInstance.patch(`/api/v1/private/establishments/${this.establishment_id}`, formData,
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
          await securedAxiosInstance.post('/api/v1/private/establishments', formData,
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


        if ( response.status == 201 ) {
          this.clear()
        }
          this.loading = false
      },

      async getAddressByCEP() {
        let response = null
        this.address.street = '';
        this.address.district = '';
        this.address.state = '';
        this.address.city = '';

        this.cepError = false;
        if (!this.address.cep) return;
        this.loadingAddress = true;

        await plainAxiosInstance.get(`https://viacep.com.br/ws/${this.address.cep}/json/`)
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

        if ( response.status == 200 ) {
          this.address.neighborhood = response.data.bairro
          this.address.complement = response.data.complemento
          this.address.city = response.data.localidade
          this.address.street = response.data.logradouro
          this.address.uf = response.data.uf
        }

        this.editAddress = false;
        this.loadingAddress = false;
      },

      clear () {
        this.$v.$reset();
        this.establishment= {
        name: '',
        details: {
          document: '',
          business_hours_start: '',
          description: '',
          email: '',
          site: '',
          facebook: '',
          instagram: '',
          twitter: '',
          phone: '',
        }
      }

      this.address = {
        cep: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        complement: ''
      }

      this.avatar = []
      this.cover = []
      this.$router.push(`/admin/establishments`)
    },

    async getEstablishment () {
      let response = null

      await securedAxiosInstance.get(`/api/v1/private/establishments/${this.establishment_id}`,
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

        this.establishment = {
          name: response.data.name,
          details: response.data.details,
        }
        this.current_avatar = response.data.avatar,
        this.current_cover = response.data.cover,
        this.address = response.data.address
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