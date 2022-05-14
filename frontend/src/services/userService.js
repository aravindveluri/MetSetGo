import api from './api';
class UserService {
    getProfile(uid) {
        return api.get(`/players/${uid}/`)
    }

    editProfile(uid, formData) {
        return api.put(`/players/${uid}/edit/`, formData)
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

    deleteEvent(eid) {
        return api.delete(`/events/${eid}/edit`)
    }

    playerEvents(uid) {
        return api.get(`/players/${uid}/events`)
    }
}
export default new UserService();