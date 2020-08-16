<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-row justify="center">
      <v-col cols="12">

        <v-card color="green" class="white--text pa-3">
          <v-row>
            <v-col cols="10">
              <h3 class="title font-weight-light"> Mesas </h3>
              <h4 class="category font-weight-thin mb-0 "> Visualize as mesas cadastradas</h4>
            </v-col>

            <v-col cols="2">
              <v-btn color="blueButtons" dark v-on:click='dialog = true'> Cadastrar </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-data-table
          :headers="headers"
          :items="tables"
        >
          <template v-slot:item.name="{ item }">
            {{item.name}}
          </template>

          <template v-slot:item.qrcode="{ item }">
            <v-btn depressed small link=true :href='item.qrcode' target='_blank' >Visualizar</v-btn>
          </template>

          <template v-slot:item.action="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="error"
                  class="cursor-type"
                  large v-on="on"
                  @click="deleteTable( item.id )"
                >
                  mdi-delete-circle
                </v-icon>
              </template>
              <span> Desativar mesa </span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  color="success"
                  class="cursor-type"
                  large v-on="on"
                  @click="editTable( item.id )"
                >
                  mdi-pencil-circle
                </v-icon>
              </template>
              <span> Editar Mesa </span>
            </v-tooltip>

          </template>
        </v-data-table>
      </v-col>
    </v-row>


    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar Mesas</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model='tablesQuantity' type='number' label="Quantidade de mesas*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false; tablesQuantity = 0">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="createTables()">Criar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { securedAxiosInstance } from '../../plugins/axios'

  export default {
    components: {
      EstablishmentNew: () => import('@/views/EstablishmentsNew'),
    },

    mounted() {
      this.establishment_id = this.$store.state.selectedEstablishment.id
      this.getTables()
    },

    data: () => ({
      establishment_id: null,

      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      tables: [],
      tablesQuantity: 0,
      error: false,

      headers: [
        {
          sortable: false,
          text: 'Nome',
          value: 'name'
        },
        {
          sortable: false,
          text: 'QR Code',
          value: 'qrcode'
        },
        {
          text: 'Ação',
          value: 'action'
        }
      ],
    }),

    methods: {
      async getTables() {
        let response = null
        await securedAxiosInstance.get(`/api/v1/private/establishments/${this.establishment_id}/tables`,
          {
            //params: { access_token: localStorage.getItem('access_token') },
            headers: { Authorization: `Bearer ${ localStorage.getItem('access_token') }` }
          }
        )
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

        if ( response.status == 200 ) {
          this.tables = response.data
        } else {
          this.error = true
        }
      },


      async createTables() {
        let response = null
        await securedAxiosInstance.post(`/api/v1/private/establishments/${this.establishment_id}/tables/`,
          {
            access_token: localStorage.getItem('access_token'), 
            quantity: this.tablesQuantity
          }
        )
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

        if ( response.status == 200 ) {
          this.tables = []
          this.getTables()
        }

        this.dialog = false;
      },


      async deleteTable( id ) {
        let response = null
        await securedAxiosInstance.delete(`/api/v1/private]/establishments/${this.establishment_id}/tables/${id}`,
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
          this.tables = []
          this.getTables()
        }
      },

      editTable( id ) {
        this.$router.push(`/admin/tables/${id}/edit`)
      }

    },
  }
</script>


<style scoped>

  .cursor-type {
    cursor: pointer;
  }
</style>