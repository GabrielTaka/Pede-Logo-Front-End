import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  searchProperty: ( id ) => securedAxiosInstance.get(`/api/v1/search_crud/new`,
  { 
    params: {
      search: {
        property: id
      }
    }
  },
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  shareWpp: ( data ) => securedAxiosInstance.post(`/api/v1/share_whatsapp`, data)
  .then((result) => {
    return result
  })
  .catch((err) => {
    return err
  }),
}