import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  list: () => plainAxiosInstance.get(`/api/v1/private/pages`)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  getMyPage:() => securedAxiosInstance.get('/api/v1/private/pages/my_page')
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),

  create: ( data ) => securedAxiosInstance.post(`/api/v1/private/pages`, data,
                        { headers: {'Content-Type': 'multipart/form-data'} })
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err.response
    }),

  update: ( pageId, data ) => securedAxiosInstance.patch(`/api/v1/private/pages/${pageId}`, data,
                        { headers: {'Content-Type': 'multipart/form-data'} })
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    })
}
