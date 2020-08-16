import Vue from 'vue'
import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {

  list: () => securedAxiosInstance.get(`/api/v1/private/clients`
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    }),

  create: ( newClient ) => securedAxiosInstance.post(`/api/v1/private/clients`,
      { account: newClient }
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    }),

  delete: ( id ) => securedAxiosInstance.delete(`/api/v1/private/clients/${id}`
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
}


