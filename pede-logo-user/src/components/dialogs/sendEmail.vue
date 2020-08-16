<template>
  <div>
     <v-dialog
      v-model="showDialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          E-mail para o Corretor
        </v-card-title>

        <v-card-text>
          <v-form class="mt-3">
            <v-textarea label="Insira a mensagem" outlined> </v-textarea>
            <v-text-field label="Código da propriedade" outlined/>
            <v-text-field label="Seu email" outlined/>
            
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      showDialog: Boolean
    },

    data() {
      return {
        dialog: true
      }
    }
  }
</script>