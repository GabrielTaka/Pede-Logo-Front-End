import Vue from 'vue'
import { securedAxiosInstance } from '../plugins/axios.js'

export default {
	byEstablishment: ( id , form ) => securedAxiosInstance.get(`/api/v1/private/establishments/${id}/products`, 
		{
			params: { access_token: form }
		}
		).then((result) => {
			return result
		}).catch((err) => {
			return err		
		})
}