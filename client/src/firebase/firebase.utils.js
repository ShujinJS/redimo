import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBlZPMHB6b10Z1WAPq1LKYVeXTf3IzNZFs",
    authDomain: "redimo-d7edd.firebaseapp.com",
    projectId: "redimo-d7edd",
    storageBucket: "redimo-d7edd.appspot.com",
    messagingSenderId: "322682228836",
    appId: "1:322682228836:web:3b042b0e69c2bb8dfa4f71",
    measurementId: "G-7FW52QS6E0"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    {/*  */}
    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    {/* Eğer userRef'ten gelen bir snapShot data'sı mevcut değilse, aşağıdaki gibi bir data oluştur. */}
    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            throw `${error.message} meydana geldi!`
        }
    }

    return userRef;   
}

firebase.initializeApp(config);

export const auth  = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: "select_account"});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;