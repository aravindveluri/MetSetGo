import api from './api';
class UserService {
    getProfile(uid) {
        return api.get(`/players/${uid}/`)
    }
}
export default new UserService();