import * as firebase from 'firebase/app';
import * as firestore from "firebase/firestore";
import { useEffect } from 'react';

const PlayGround = ({ firebaseConfig: config }: { firebaseConfig: any }) => {
    console.log(config)
    let app;
    let firebaseTag = 'firebase_login';
    try {
        const firebaseApps = firebase.getApp(firebaseTag);
        app = firebaseApps
    } catch (error) {
        app = firebase.initializeApp({
            apiKey: config.FIREBASE_API_KEY,
            authDomain: config.FIREBASE_AUTH_DOMAIN,
            projectId: config.PROJECT_ID,
            storageBucket: config.STORAGE_BUCKET,
            messagingSenderId: config.MESSAGING_SENDER_ID,
            appId: config.APP_ID,
        }, firebaseTag)
    }
    
    const db = firestore.getFirestore(app);
    const collection: any = firestore.collection(db, 'user');
    useEffect(() => {
       try {
        const citySnapshot = firestore.getDocs(collection).then(citySnapshot => {
            const result = citySnapshot.docs.map(doc => doc.data())
            console.log(result);
        });
       } catch (error) {
           console.log(error,'xxx')
       }
    }, [])
    return (<div>Hai</div>)

}
export async function getServerSideProps() {
    return {
        props: {
            firebaseConfig: {
                FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
                FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
                PROJECT_ID: process.env.PROJECT_ID,
                STORAGE_BUCKET: process.env.STORAGE_BUCKET,
                MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
                APP_ID: process.env.APP_ID,
            }
        }, // will be passed to the page component as props
    }
}


export default PlayGround;