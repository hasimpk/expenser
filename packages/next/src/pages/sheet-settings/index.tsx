import { useRouter } from 'next/router';
import SheetSettingTabs from '../../components/sheet-settings';
import SideBar from '../../components/sidebar';
import helper from '../../helper';
import UseStorage from '../../hooks/get-data';

const SheetSettings = () => {
    const router = useRouter();
    const { data } = UseStorage(helper.getFirebaseConfig());

    const callBack = (spreadSheetId: string) => {
        if (spreadSheetId) {
            router.push('/home');
        }
    };
    console.log(data);
    return (<>
        <SideBar>
            <SheetSettingTabs 
                currentSheetLink={data.sheetLink}
                sheetId={data.sheetId}
                sheetLink={data.sheetLink}
             />
        </SideBar>
    </>)
}

export default SheetSettings