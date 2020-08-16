<template>
  <v-container>
    <v-card color="primary">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 white--text">{{ establishment.name }}</h1>
      </v-card-title>

      <v-tabs v-model="tab" background-color="transparent" color="white" grow>
        <v-tab>Estabelecimento</v-tab>
        <v-tab>Produtos</v-tab>
        <v-tab>Categorias</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <!-- Users -->
    

        <!-- Establishment -->
        <v-tab-item>
          <establishment-edit :from_establishment="true" />
        </v-tab-item>

        <!-- Products -->
        <v-tab-item>
          <v-data-table :headers="headers_product" :items="products">
            <template v-slot:item.title="{ item }">{{item.title}}</template>

            <template v-slot:item.price="{ item }">R$ {{item.price}}</template>

            <template v-slot:item.description="{ item }">{{item.description}}</template>

            <template v-slot:item.category="{ item }">
              <v-chip
                v-for="(category_type, index) in item.category_types"
                :key="index"
                color="primary"
                dark
              >
                {{ category_type.name }}
              </v-chip>
            </template>

            <template v-slot:item.action="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="error"
                    class="cursor-type"
                    large
                    v-on="on"
                    @click="deleteProduct( item.id )"
                  >mdi-delete-circle</v-icon>
                </template>
                <span>Excluir Produto</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="success"
                    class="cursor-type"
                    large
                    v-on="on"
                    @click="editProduct( item.id )"
                  >
                    mdi-pencil-circle
                  </v-icon>
                </template>
                <span>Editar Produto</span>
              </v-tooltip>
              
            </template>
          </v-data-table>
        </v-tab-item>

        <!-- categories list -->
        <v-tab-item>

          <v-btn
            dark
            class="float-right mt-5 mr-5"
            @click="showDialog()"
            color="blueButtons"
          >
            Adicionar Categoria
          </v-btn>

          <v-alert class="position-alert" v-if="showAlert" :type="messageClass">
            {{ message }}
          </v-alert>

          <v-data-table
            :headers="headers_categories"
            :items="categories_establishment"
            class="margin-table-category"
          >

            <template v-slot:item.action="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon
                    color="error"
                    class="cursor-type"
                    large
                    v-on="on"
                    @click="undoCategory( item.id )"
                  >mdi-delete-circle</v-icon>
                </template>
                <span>Desvincular Categoria</span>
              </v-tooltip>
            </template>
          </v-data-table>

          <v-dialog v-model="dialogCategories" width="700">
            <v-card>
              <v-card-title class="primary" primary-title>
                <v-row>
                  <v-col cols="12" md="10">Seleciones as Categorias</v-col>
                  <v-col cols="12" md="2">
                    <v-btn
                      dark
                      color="blueButtons"
                      class="float-right"
                      @click="addCategories()"
                    >Adicionar</v-btn>
                  </v-col>
                </v-row>
              </v-card-title>

              <v-card-text>
                <v-data-table
                  :headers="headers_categories_modal"
                  :items="categories"
                  hide-default-footer
                  show-select
                  v-model="selected_categories"
                  item-key="id"
                >
                  <template v-slot:item.icon="{ item }">
                    <v-img :src="item.icon" class="style-icon" />
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>


<script>
import { securedAxiosInstance, plainAxiosInstance } from "../plugins/axios";

export default {
  components: {
    UserNew: () => import("@/views/UsersNew"),
    EstablishmentEdit: () => import("@/views/EstablishmentsNew"),
    ProductEdit: () => import("@/views/ProductsEdit")
  },

  data() {
    return {
      tab: null,
      establishment_id: null,
      establishment: {},
      current_avatar: null,
      current_cover: null,
      address: null,
      users: [],
      products: [],
      categories: [],
      categories_establishment: [],
      dialogCategories: false,
      selected_categories: [],
      showAlert: false,
      message: '',
      messageClass: null,

      headers: [
        {
          sortable: false,
          text: "E-mail",
          value: "email"
        },
        {
          sortable: false,
          text: "Papel",
          value: "role"
        },
        {
          text: "Ação",
          value: "action"
        }
      ],

      headers_product: [
        {
          sortable: false,
          text: "Preço (R$)",
          value: "price"
        },
        {
          sortable: false,
          text: "Descrição",
          value: "description"
        },
        {
          text: "Ação",
          value: "action"
        }
      ],

      button_action: "Novo Profissional",
      form_user: false,

      headers_categories_modal: [
        {
          sortable: false,
          text: "Nome",
          value: "name"
        },
        {
          sortable: false,
          text: "Icone",
          value: "icon"
        }
      ],

      headers_categories: [
        {
          sortable: false,
          text: "Nome",
          value: "name"
        },
        {
          sortable: false,
          text: "Ação",
          value: "action"
        }
      ]
    };
  },

  mounted() {
    this.establishment_id = this.$route.params.id;
    this.getEstablishment();
  },

  methods: {
    async getEstablishment() {
      let response = null;
      await securedAxiosInstance
        .get(`/api/v1/private/establishments/${this.establishment_id}`, {
          params: { access_token: localStorage.getItem("access_token") }
        })
        .then(result => {
          response = result;
        })
        .catch(err => {
          response = err;
        });

      if (response.status == 200) {
        this.establishment = {
          name: response.data.name,
          details: response.data.details
        };
        this.current_avatar = response.data.avatar
        this.current_cover = response.data.cover
        this.address = response.data.address
        this.users = response.data.users;
        this.products = response.data.products;
        this.categories_establishment = response.data.category_types
      }
    },

    selectForm() {
      if (!this.form_user) {
        this.form_user = true;
        this.button_action = "Voltar";
      } else {
        this.form_user = false;
        this.button_action = "Novo Profissional";
      }
    },

    returnState() {
      this.form_user = false;
      this.button_action = "Novo Profissional";

      (this.establishment = {}), (this.users = []);
      this.products = [];
      this.getEstablishment();
    },

    editUser(id) {
      this.$router.push(`/admin/users/${id}/edit`);
    },

    async deleteUser(id) {
      let response = null;
      await securedAxiosInstance
        .delete(`/api/v1/private/users/${id}`, {
          params: { access_token: localStorage.getItem("access_token") }
        })
        .then(result => {
          response = result;
        })
        .catch(err => {
          response = err;
        });

      if (response.status == 200) {
        this.users = [];
        this.establishment = {};
        this.products = [];
        this.getEstablishment();
      }
    },

    showDialog() {
      this.dialogCategories = true;
      this.getCategories();
    },

    async getCategories() {
      let response = null;

      await securedAxiosInstance
        .get(`/api/v1/private/category_types`, {
          params: { access_token: localStorage.getItem("access_token") }
        })
        .then(result => {
          response = result;
        })
        .catch(err => {
          response = err;
        });

      if (response.status == 200) {
        this.categories = response.data;
      } else {
        this.error = true;
      }
    },

    async addCategories() {
      let response = null
      this.categories_id = []

      this.selected_categories.forEach( category => {
        this.categories_id.push(category.id)
      })

      await securedAxiosInstance
        .patch(`/api/v1/private/establishments/${this.establishment_id}/add_category`,
          {
            access_token: localStorage.getItem('access_token'),
            category_id: this.categories_id
          })
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

      if ( response.status == 200 ) {
        this.dialogCategories = false
        this.selected_categories = []
        this.getEstablishment()
        this.showAlert = true
        this.messageClass = "success"
        this.message = "Categoria adicionada com sucesso."


      } else {
        this.showAlert = true
        this.messageClass = "error"
        this.message = "Erro ao adicionar categoria."
      }

      this.offAlert()
    },

    async undoCategory ( id ) {
      let response = null

      await securedAxiosInstance
        .patch(`/api/v1/private/establishments/${this.establishment_id}/undo_category`,
          {
            access_token: localStorage.getItem('access_token'),
            category_id: id
          })
        .then((result) => {
          response = result
        }).catch((err) => {
          response = err
        });

      if ( response.status == 204 ) {
        this.showAlert = true
        this.messageClass = "success"
        this.message = "Categoria desvinculada com sucesso."
        this.getEstablishment()

      } else {
        this.showAlert = true
        this.messageClass = "error"
        this.message = "Erro ao desvincular categoria."
      }

      this.offAlert()
    },

    async deleteProduct( id ) {
      let response = null
      await securedAxiosInstance.delete(`/api/v1/private/products/${id}`,
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
        this.products = []
        this.getProducts()
      }
    },

    editProduct( id ) {
      this.$router.push(
        {
            name: 'edit_product',
            params: { from_admin: true, id: id, establishment_id: this.establishment_id}
          }
      )
    },


    offAlert () {
      setTimeout(() => {
        this.showAlert = false
      }, 2000);
    }

  }
};
</script>

<style scoped>
.margin-table {
  padding-top: 80px;
}

.margin-table-category {
  padding-top: 80px;
}

.style-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-top: 5px;
  margin-bottom: 5px;
}

.position-alert {
  position: relative;
  top: 70px;
}
</style>

