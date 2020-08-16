import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  list: () => plainAxiosInstance.get(`/api/v1/plans`)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),


  hire: (data) => securedAxiosInstance.post('/api/v1/private/payments', data)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  getPSSession: () => securedAxiosInstance.get('/api/v1/private/payments/ps_session')
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  /*create: ( data ) => securedAxiosInstance.post(`/api/v1/private/pages`, data,
                        { headers: {
                          'Content-Type': 'multipart/form-data',
                        } })
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }) */
}