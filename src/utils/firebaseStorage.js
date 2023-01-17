import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

export const storage = getStorage();
export const db = getFirestore();

export const uploadData = async (username, img, user) => {
    console.log(user);
    const randomDate = Math.floor(Date.now() / 1000);
    const storageRef = ref(storage, username + `${randomDate}`);

    await uploadBytesResumable(storageRef, img).then(
        () => {
            getDownloadURL(storageRef)
                .then(async (downloadUrl) => {
                    await updateProfile(user, {
                        displayName: username,
                        photoURL: downloadUrl,
                    });
                    await setDoc(doc(db, 'users', user.uid), {
                        uid: user.uid,
                        displayName: username,
                        email: user.email,
                        photoURL: downloadUrl,
                    });
                    await setDoc(doc(db, 'userChats', user.uid), {

                    })
                })
    })
}
