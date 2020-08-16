import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  list: () => plainAxiosInstance.get(`/api/v1/private/category_types`)
    .then((result) => {
      return result
    })
    .catch((err) => {
      return err
    }),
}