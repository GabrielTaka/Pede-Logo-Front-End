import Vue from 'vue'
import { plainAxiosInstance, securedAxiosInstance } from '../plugins/axios.js'

export default {
	byEstablishment: ( id , form ) => securedAxiosInstance.get(`/api/v1/private/establishments/${id}/users`, 
		{
			params: { access_token: form }
		}
		).then((result) => {
			return result
		}).catch((err) => {
			return err		
		}),
	
	allUsers: (role , form) => securedAxiosInstance.get(`/api/v1/private/users/by_role/${role}`, 
		{
			params: { access_token: form }
		}
		).then((result) => {
			return result
		}).catch((err) => {
			return err		
		}),
	
	currentUser: ( form ) => securedAxiosInstance.get(`/api/v1/private/current/user`, 
		{
			params: { access_token: form }
		}
		).then((result) => {
			return result
		}).catch((err) => {
			return err		
		}),

}