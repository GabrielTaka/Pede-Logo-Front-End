import Vue from 'vue'
import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {

  list: () => securedAxiosInstance.get(`/api/v1/private/realtors`
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    }),

  my: () => securedAxiosInstance.get(`/api/v1/private/my_realtors`
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    }),

  create: ( params ) => securedAxiosInstance.post(`/api/v1/private/realtors`,
      { realtor_client: params }
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    }),

  delete: ( id ) => securedAxiosInstance.delete(`/api/v1/private/realtors/${id}`
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
}


