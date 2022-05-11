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

    createEvent(formData) {
        return api.post(`/events/create`, formData)
    }

    editEvent(eid, formData) {
        return api.put(`/events/${eid}/edit`, formData)
    }

    getEvent(eid) {
        return api.get(`/events/${eid}`)
    }

    joinEvent(eid) {
        return api.post(`/events/join`, { event: eid })
    }

    getEventCatalog() {
        return api.get(`/events/`)
    }

}
export default new UserService();