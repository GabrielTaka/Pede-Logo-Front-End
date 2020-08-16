<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >

    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  
    <v-row justify="center">
      <v-col cols="12">

        <v-card color="green" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> Listagem de pedidos </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize os pedidos do seu estabelecimento.</h4>
            </v-col>
          </v-row>
        </v-card>

        <v-card>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="schedulings"
              :items-per-page="15"
              class="elevation-1 mb-5 mt-5"
            >
              <template v-slot:item.action="{ item }">
                <v-icon @click="openModal(item)"> mdi-pencil </v-icon>
              </template>
            </v-data-table>
         

             <v-dialog
               v-model="dialog"
                width="500"
              >

                <v-card>
                  <v-card-title
                    class="headline grey lighten-2"
                    primary-title
                  >
                    Produto: {{ selectedItem.product.description}}
                  </v-card-title>

                  <v-card-text>
                    <v-select
                      outlined
                      :items="items"
                      class="mt-5"
                      label="Selecione o nome status do pedido"
                      v-model="newStatus"
                      item-text="text"
                      item-value="value"
                    ></v-select>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="dialog = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="success"
                      @click="sendRequest()"
                    >
                      Alterar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

       
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>
  import UserRepository from '../repositories/UserRepository'
  import ProductRepository from '../repositories/ProductRepository'
  import SchedulerRepository from '../repositories/SchedulerRepository'

  import { securedAxiosInstance } from '../plugins/axios'
  import moment from 'moment';
  import { format } from 'path';
  import { mask } from 'vue-the-mask'

  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

  export default {
    directives: { mask },

    mixins: [validationMixin],

    validations: {
      scheduling: {
        user_id: { required },  
        product_id: { required },
        professional_id: { required },
        start: { required },
      },
    },

    mounted() {
      this.getSchedulings()
    },

    data: () => ({
      schedulings: [],
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Dom - Sab', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Seg - Dom', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Seg - Sex', value: [1, 2, 3, 4, 5] },
        { text: 'Seg, Qua, Qui', value: [1, 3, 5] },
      ],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

      showDialogDetails: false,
      showDialogNewScheduler: false,
      overlay: false,
      headers: [
          { text: 'Produto', value: 'product.description', },
          { text: 'Preço R$', value: 'product.price' },
          { text: 'Estabelecimento', value: 'establishment.name' },
          { text: 'Status', value: 'status' },
          { text: 'Ação', value: 'action'}
        ],



      eventScheduled: {
        all_data: {
          establishment: {
            name: null
          },
          professional: {
            name: null
          },
          product: {
            name: null
          },
          user: {
            name: null
          },
          subcategory: {
            name: null
          },
          start: null,
          end: null,
        },
      },

      users: [],
      products: [],
      customers: [],
      hourMask: 'XX:XX',
      registerDay: null,
      registerMonth: null,
      registerYear: null,

      scheduling: {
        establishment_id: null,
        user_id: null,
        professional_id: null,
        product_id: null,
        start: null
      },

      step: 1,
      pickerNewScheduler: null,
      selectedItem: {
        product: {
          description: ''
        }
      },
      dialog: false,
      items: [
        { text: 'Pedido em aberto', value: 0 },
        { text: 'Pedido sendo feito', value: 1 },
        { text: 'Pedido enviado', value: 2 },
        { text: 'Pedido pago', value: 3 }
      ],
      newStatus: ''
    }),

    computed: {
      schedulingUsersErrors () {
        const errors = []
        if (!this.$v.scheduling.user_id.$dirty) return errors
        !this.$v.scheduling.user_id.required && errors.push('Selecione um usuário.')
        return errors
      },

      schedulingProductErrors () {
        const errors = []
        if (!this.$v.scheduling.product_id.$dirty) return errors
        !this.$v.scheduling.product_id.required && errors.push('Selecione um produto.')
        return errors
      },

      schedulingProfessionalErrors () {
        const errors = []
        if (!this.$v.scheduling.professional_id.$dirty) return errors
        !this.$v.scheduling.professional_id.required && errors.push('Selecione um profissional.')
        return errors
      },

      schedulingStartErrors () {
        const errors = []
        if (!this.$v.scheduling.start.$dirty) return errors
        !this.$v.scheduling.start.required && errors.push('Informe um horário.')
        return errors
      },
    },

    methods: {
      
      async getSchedulings() {
        let response = null
        let events = []
        await securedAxiosInstance.get(`/api/v1/establishments/${this.$store.state.selectedEstablishment.id}/schedulings`,
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
          this.schedulings = response.data
        }
      },

      openModal( item ) {
        this.selectedItem = item 
        this.dialog = true
      },

      async sendRequest() {
        let response = await SchedulerRepository.updateScheduling(localStorage.getItem('access_token'), this.selectedItem.id, this.newStatus )
        if ( response.status == 200 ) {
          this.schedulings = []
          this.getSchedulings()
        }
        this.dialog = false
      }
    }

  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }

  .sheet-title {
    height: 70px !important;
  }

  .full-width {
    width: 100%;
  }
</style>