import { useEffect } from "react";

const GooglePicker = ({})=>{

    const isReadyGoogleApi = ()=>{
        console.log('isReadyGoogleApi',window.gapi);
    }
    useEffect(()=>{
        isReadyGoogleApi();
    },[])
  return (
    <div className="text-white">
      <h1>Google Picker</h1>
    </div>
  )
}


export default GooglePicker;