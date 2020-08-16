import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  isLogged : () => plainAxiosInstance.get(`/users/is-logged`)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  signIn: ( data ) => plainAxiosInstance.post(`/oauth/token`, data)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  signUp: ( data ) => plainAxiosInstance.post(`/api/v1/users`, data)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  registerAccountAttributes: (data) => securedAxiosInstance.patch('/api/v1/private/account', data)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),
}