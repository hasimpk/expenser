import { useEffect, useState } from "react"
import * as firebase from 'firebase/app';
import { FIREBASE_TAG } from '../config/constants';
const SheetStorage = () => {
    const [data, setData] = useState<any>({});
    const firebaseApps = firebase.getApp(FIREBASE_TAG);
    console.log(firebaseApps,'xxx')
    useEffect(() => {
        const {
            spreadSheetId,
            spreadSheetLink
        } = data
        const currentUser = window.localStorage.getItem('currentUser');
        if (currentUser && spreadSheetId) {
            const spreadSheetData = {
                [currentUser]: {
                    spreadSheetId,
                    spreadSheetLink
                }
            }
            window.localStorage.setItem('spreadSheetData', JSON.stringify(spreadSheetData))
        }
    }, [data])
    return [data, setData]
}

export default SheetStorage