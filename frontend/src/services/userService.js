import api from './api';
class UserService {
    getProfile(uid) {
        return api.get(`/players/${uid}/`)
    }

    getSports() {
        return api.get(`/sports/`)
    }

    getVenues() {
        return api.get(`/venues/`)
    }

    createProfile(formData) {
        return api.post(`/events/create`, formData)
    }
}
export default new UserService();