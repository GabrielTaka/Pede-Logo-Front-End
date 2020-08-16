import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  list: () => plainAxiosInstance.get(`/api/v1/establishments_random`)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  listAll: () => plainAxiosInstance.get(`/api/v1/establishments`)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  listByCategory: ( id ) => plainAxiosInstance.get(`/api/v1/establisments/by_categories/${id}`)
  .then((result) => {
    return result
  })
  .catch((err) => {
    return err
  }),

  show: ( id ) => plainAxiosInstance.get(`/api/v1/establishments/${id}`)
  .then((result) => {
    return result
  })
  .catch((err) => {
    return err
  }),

  showOrders: () => securedAxiosInstance.get(`/api/v1/private/show_by_user`)
  .then((result) => {
    return result
  })
  .catch((err) => {
    return err
  }), 

  create: ( data ) => securedAxiosInstance.post(`/api/v1/private/scheduling`, data,
  { headers: {'Content-Type': 'multipart/form-data'} })
  .then((result) => {
    return result
  })
  .catch((err) => {
    return err.response
  }),
  
}