
import Vue from 'vue'
import { securedAxiosInstance } from '../plugins/axios.js'

export default {
	registerScheduling : (form, token) => securedAxiosInstance.post(`/api/v1/private/scheduling`, 
		JSON.stringify({
			access_token: token,
			scheduling: form
		})
		
		).then((result) => {
			return result
		}).catch((err) => {
			return err		
		}),

	deleteScheduling: ( token, id ) => securedAxiosInstance.delete(`api/v1/private/scheduling/${id}`, 
		{
			params: { access_token: token }
		},
		).then((result) => {
			return result
		}).catch((err) => {
			return err
		}),

	updateScheduling: ( token, id, form ) => securedAxiosInstance.patch(`api/v1/private/scheduling/${id}`, 
		JSON.stringify({
			access_token: token,
			status: form
		})	
		).then((result) => {
			return result
		}).catch((err) => {
			return err
		}),
}


	