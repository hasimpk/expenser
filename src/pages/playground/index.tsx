import * as firebase from 'firebase/app';
import * as firestore from "firebase/firestore/lite";
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
    const fetchData = async () => {
        try {
            // const citySnapshot = firestore.getDocs(collection).then(citySnapshot => {
            //     const result = citySnapshot.docs.map(doc => doc.data())
            //     console.log(result);
            // });
            const query = firestore.query(collection, firestore.where('uid', '==', '123'));
            // const condition = collection.where('uid', '==', '123');

            const snapShot = await firestore.getDocs(query);
            // const addSnapShot = await firestore.addDoc(collection,{name:'new user'});
            const result = snapShot.docs.map(doc => doc.data())
            console.log(result, 'xx');
        } catch (error) {
            console.log(error, 'xxx')
        }
    }
    const updateData = async () => {
        const query = firestore.query(collection, firestore.where('uid', '==', '123'));
        // const docRef = firestore.doc(db, 'user');
        const snapShot = await firestore.getDocs(query);
        const result = snapShot.docs.map(doc => {
            return { id: doc.id, data: doc.data() }
        })
        console.log(result, 'xx');;
        const id = result[0].id
        const updateRef = firestore.doc(db, `user`,id);
        await firestore.setDoc(updateRef, { name: 'new user' });

    }
    useEffect(() => {
        // fetchData();
        updateData();
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