import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  list: () => plainAxiosInstance.get(`/api/v1/private/companies`)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  create: ( data ) => securedAxiosInstance.post(`/api/v1/private/companies`, data,
                        { headers: {
                          'Content-Type': 'multipart/form-data',
                        } })
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    })
}