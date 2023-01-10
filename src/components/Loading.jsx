import React,{useEffect, useState} from 'react'
import * as loadingData from "../loading.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
const Loading = () => {
    const [loading,setLoading] = useState(false)
    useEffect(() =>{
       setLoading(true)    
       setTimeout(() => {
       },2500)
    },[])
  return (
    <div> <FadeIn>
    <div style={{ display: "flex" }}>
      {loading ? (
        <Lottie options={defaultOptions} height={500} width={500} style={{marginTop:80}} isClickToPauseDisabled />
      ) : (
      <></>
      )}
    </div>
  </FadeIn></div>
  )
}

export default Loading