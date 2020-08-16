import Vue from 'vue'
import { plainAxiosInstance } from '@/packs/plugins/axios'

export default {
	listAlerts : () => plainAxiosInstance.get(`/get_alerts`
		).then((result) => {
			return result
		}).catch((err) => {
			return err
    })
}
