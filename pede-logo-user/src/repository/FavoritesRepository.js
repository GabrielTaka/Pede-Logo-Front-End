import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  listFavorites : () => securedAxiosInstance.get(`/api/v1/private/favorites`
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    }),

  addFavorites : ( property_id ) => securedAxiosInstance.post(`/api/v1/private/favorites`,
    {
      property_id: property_id
    }
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    }),

  removeFavorites : ( id ) => securedAxiosInstance.delete(`/api/v1/private/favorites/${id}`,
    ).then((result) => {
      return result
    }).catch((err) => {
      return err
    })
}
