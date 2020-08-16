import Vue from 'vue'
import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  listCities: () => plainAxiosInstance.get(`/api/v1/cities`
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  listStates: () => securedAxiosInstance.get(`/api/v1/crud/get_states`
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  listCitiesByState: ( id ) => securedAxiosInstance.get(`/api/v1/crud/cities_list`,
  {
    params: { state_id: id }
  }
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  })
}


