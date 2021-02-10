import Axios from 'axios'

const api = {
	axios: Axios.create({
		baseURL: 'https://jsonplaceholder.typicode.com'
	}),
	getUsers: async () => await api.axios.get('/users'),
	getAlbums: async () => await api.axios.get('/albums'),
	getPhotos: async () => await api.axios.get('/photos')
}

export default api