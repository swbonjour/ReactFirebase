import { app } from './firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const auth = getAuth(app);
export const createUser = async (email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        return res.user;
    } catch(error) {
        return true;
    }
}