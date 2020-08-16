import { plainAxiosInstance, securedAxiosInstance } from '@/packs/plugins/axios'

export default {
  get: (id) => plainAxiosInstance.get(`/api/v1/properties/search/${id}`
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  getLogged: (id) => securedAxiosInstance.get(`/api/v1/properties/search/${id}`
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  listPopularProperties: () => plainAxiosInstance.get(`/api/v1/properties/most_popular`
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  search: (data) => plainAxiosInstance.get(`api/v1/properties/search`, {params: data}
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  searchLogged: (data) => securedAxiosInstance.get(`api/v1/properties/search`, {params: data}
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  listPropertiesType: () => securedAxiosInstance.get(`/api/v1/crud/get_property_types`
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  registerProperty: ( data ) => securedAxiosInstance.post(`/api/v1/crud`, data)
  .then((result) => {
    return result
  })
  .catch((err) => {
    return err
  }),

  listActiveProperties: () => securedAxiosInstance.get(`/api/v1/crud`,
    {
      params: { active: true }
    }
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  listSoldProperties: () => securedAxiosInstance.get(`/api/v1/crud`,
    {
      params: { only_sold: true }
    }
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),

  listProperty: ( id ) => securedAxiosInstance.get(`/api/v1/crud/${id}/by_id`,
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  }),


  updatePropertyData: ( formData, id ) => securedAxiosInstance.patch(`/api/v1/crud/${id}`, formData)
  .then((result) => {
    return result
  })
  .catch((err) => {
    return err
  }),

  deletePropertyData: ( id ) => securedAxiosInstance.delete(`/api/v1/crud/${id}`,
  ).then((result) => {
    return result
  }).catch((err) => {
    return err
  })
}