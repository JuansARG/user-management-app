import axios from 'axios';
import env from '../env';

class LoginService {
    async login(email, password) {
        const { data } = await axios.post(`${env.BACKEND_URL}/api/login`, {
            email,
            password,
        });
        return data;
    }
}

export default new LoginService();
