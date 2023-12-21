import { AbsoluteFill, Composition, staticFile,interpolate,useCurrentFrame, Sequence, Series } from "remotion";
import { Img } from "remotion";
import { StaticFile,useVideoConfig, Series } from "remotion";
import { Audio } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { clockWipe} from "@remotion/transitions/clock-wipe";
import { slide } from "@remotion/transitions/slide";
import "./font.css";
import "animate.css";
import { useVideoConfig, interpolate, spring } from 'remotion';
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";




export const RemotionVideo = () => {
  return (
    <Composition
      id="Myvideo"
      component={composition}
      durationInFrames={800}
      fps={30}
      height={1080}
      width={1080}
    />
  );
};

const composition = () => {
  const { width, height } = useVideoConfig();
 
  return (
    <Sequence>
    <AbsoluteFill style={{ backgroundColor: "white" }}>
      <Sequence durationInFrames={60}>
      <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={60}>
      <IntroClick />
      <MouseClick/>
      <Click/>
      <Sequence from={26} durationInFrames={8}> <Audio src={staticFile("mouse-click.mp3")}></Audio></Sequence>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={clockWipe({ width, height })}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={30}>
        <AbsoluteFill style={{backgroundColor:'black'}}> </AbsoluteFill>
      </TransitionSeries.Sequence>
      </TransitionSeries>
      </Sequence>
      {/*stomb audio*/}
      <Sequence from={40}>
      <Audio src={staticFile("stomb1.mp3")}></Audio>
      </Sequence>

      <Sequence from={60}>
      <StartingText1/>
      </Sequence>
      <Sequence from={120}>
        <StartingText2/>
      </Sequence>
      <Sequence from={304}>
        <StartingText3/>
      </Sequence>
      <Sequence from={354}>
        <StartingText4/>
      </Sequence>
    </AbsoluteFill>
    </Sequence>
  );
};

const IntroClick = () => {
  const circleStyle = {
    width: 300,
    height: 300,
    borderRadius: "50%",
    overflow: "hidden",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <AbsoluteFill>
      <div style={circleStyle}>
        <Img src={staticFile("i1.jpg")} style={imageStyle} />
      </div>
    </AbsoluteFill>
  );
};


const MouseClick=()=>{
  const frame = useCurrentFrame();
  const mouse = interpolate(frame,[0,26],[-0,-360],{extrapolateRight:"clamp"})
  return <div style={{marginTop:"90%", marginLeft:"55%",transform:`translatey(${mouse}px)`}}>
  <Img style={{height:70,width:70}} src={staticFile("cursor.png")}></Img>
  </div>
}
const Click = () => {
  const frame = useCurrentFrame();

  // Only show the Click component between frames 26 and 30
  if (frame >= 26 && frame <= 34) {
    
    return (
      <div style={{ marginTop: "90%", marginLeft: "-6.3%", transform: `translateY(-360px)` }}>
        <Img style={{ height: 70, width: 70 }} src={staticFile("cursor (1).png")} />
      </div>
    );
  }

  // Return null outside the specified frame range
  return null;
};

const ClickToStartTransition = ()=>{
  const { width, height } = useVideoConfig();
 
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={40}>
        <Letter color="#0b84f3">A</Letter>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={clockWipe({ width, height })}
        timing={linearTiming({ durationInFrames: 30 })}
      />
      <TransitionSeries.Sequence durationInFrames={60}>
        <Letter color="pink">B</Letter>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
}

const StartingText1 = () => {
  const frame = useCurrentFrame();
  const s1 = interpolate(frame, [0, 7], [0.36, 1], { extrapolateRight: "clamp" });
  const s2 = interpolate(frame, [0, 30], [0, 400], { extrapolateRight: "clamp" });
  
  const textstyle = {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    color: 'black',
    fontSize: 150,
    transform: `scale(${s1})`,
    fontFamily:"inter",
    fontWeight:"bolder"
    
  };
  const textstyle1 = { alignItems: "center", justifyContent: "center", backgroundColor: 'black', color: 'white', fontSize: 150, transform: `scale(${s1})`, fontFamily:"inter",fontWeight:"bolder"};

  const textstyle2 = { marginLeft:"9%", marginTop:"43%",alignItems: "center", justifyContent: "center", backgroundColor: 'white', color: 'black', fontSize: 110, fontFamily:"inter",fontWeight:"bolder"};
  const textstyle3 = { marginLeft:"39%", marginTop:"43%",alignItems: "center", justifyContent: "center", backgroundColor: 'white', color: 'black', fontSize: 110, fontFamily:"inter",fontWeight:"bolder"};
  const textstyle4 = { marginLeft:"64%", marginTop:"43%",alignItems: "center", justifyContent: "center", backgroundColor: 'white', color: 'black', fontSize: 110, fontFamily:"inter",fontWeight:"bolder"}; 
  const textstyle5 = { marginTop:"43%",transform: `translateX(${s2}px)`,alignItems: "center", justifyContent: "center", backgroundColor: 'white', color: 'black', fontSize: 110, fontFamily:"inter",fontWeight:"bolder"};   

  return <div>
    <Sequence durationInFrames={15}> <AbsoluteFill style={textstyle}>Hello!</AbsoluteFill></Sequence>
    <Sequence from={15} durationInFrames={15}> <AbsoluteFill style={textstyle1}>Hello!</AbsoluteFill></Sequence>
    
    <Sequence from={30} durationInFrames={30}>
    <div style={textstyle2}>HOW</div>
    </Sequence>
    <Sequence from={40} durationInFrames={20}>
    <div style={textstyle3}>ARE</div>
    </Sequence>
    <Sequence from={50} durationInFrames={10}>
    <div style={textstyle4}>YOU?</div>
    </Sequence>
        </div>
};

const StartingText2=()=>{
  const frame = useCurrentFrame();
  const s1 = interpolate(frame, [0, 4], [0, 400], { extrapolateRight: "clamp" });
  const s2 = interpolate(frame, [0, 22], [900, 340],{extrapolateRight:"clamp"});
  const s3 = interpolate(frame, [0, 30], [0, -400],{extrapolateRight:"clamp"});
  const s4 = interpolate(frame, [40, 45], [1.5, 1],{extrapolateRight:"clamp"});
  const s5 = interpolate(frame, [110, 130], [0, 40],{extrapolateRight:"clamp"},{easing:"Easing.ease"});
 
  
  
  
  const textstyle = {  marginTop: "43%",transform: `translateX(${s1}px)`,alignItems: "center", justifyContent: "center", color: 'white', fontSize: 110, fontFamily:"inter",fontWeight:"bolder"}; 
  const textstyle1 = { marginTop:"43%",transform: `translateX(${s2}px)`,alignItems: "center", justifyContent: "center", backgroundColor: 'white', color: 'black', fontSize: 110, fontFamily:"inter",fontWeight:"bolder"};     
  const textstyle2 = { marginLeft:"32%", transform: `translateY(${s3}px)`,marginTop:"80%", fontSize: 110, fontFamily:"inter",fontWeight:"bolder",color:"white"}; 
  const textstyle3 = {
              alignItems: "center",
              justifyContent: "center",
              fontSize: 110,
              transform: `scale(${s4})`,
              fontFamily:"inter",fontWeight:"bolder"
            };
  const arr=['LET ME','INTRODUCE','MYSELF','I','AM'];
 
  
  return <Series>
    <Series.Sequence from={0} durationInFrames={15}>
      <div style={{backgroundColor: 'black', width:"100%",height:"100%"}}>
    <div style={textstyle}>FINE?</div>
    </div>
    </Series.Sequence>
    <Series.Sequence from={16} durationInFrames={10}>
    <div style={textstyle1}>GOOD?</div>
    </Series.Sequence>
    <Series.Sequence from={25} durationInFrames={15}>
    <div style={{backgroundColor: 'black', width:"100%",height:"100%"}}>
    <div style={textstyle2}>GREAT!</div>
    </div>
    </Series.Sequence>
    {arr.map((value, index) => (
        <Series.Sequence key={index} from={40 + index * 15} durationInFrames={15}>
          <AbsoluteFill style={{...textstyle3, transform: `scale(${interpolate(frame, [40 + index * 13, 45 + index * 13], [1.5, 1], { extrapolateRight: "clamp" })})`,backgroundColor: index % 2 === 0 ? 'black' : 'white',color: index % 2 === 0 ? 'white' : 'black'}}>{value}</AbsoluteFill>
        </Series.Sequence>
      ))}
       <Series.Sequence from={110} durationInFrames={8}>
        <AbsoluteFill style={{letterSpacing:"2px",paddingLeft:"3%",display:"flex",alignItems:"center",fontSize:100, paddingTop:"45%",backgroundColor:"white",color: "black",fontSize: 110,fontFamily:"inter",  fontWeight:"bolder",}}>
      SIVARANJAN
    </AbsoluteFill>
      </Series.Sequence>
      
      <Series.Sequence from={118} durationInFrames={42}>
        <AbsoluteFill style={{paddingLeft:"3%",display:"flex",alignItems:"center",letterSpacing:`${s5}px`,fontSize:100, paddingTop:"45%",color: "white",backgroundColor:"black",fontSize: 110,fontFamily:"inter",  fontWeight:"bolder",}}>
      SIVARANJAN
    </AbsoluteFill>
      </Series.Sequence>
        <Series.Sequence from={161} durationInFrames={5}><AbsoluteFill style={{width:"100%",height:"100%", backgroundColor:"white"}}></AbsoluteFill></Series.Sequence>
        <Series.Sequence from={167} durationInFrames={5}><AbsoluteFill style={{width:"100%",height:"100%", backgroundColor:"black"}}></AbsoluteFill></Series.Sequence>
        <Series.Sequence from={173} durationInFrames={5}><AbsoluteFill style={{width:"100%",height:"100%", backgroundColor:"white"}}></AbsoluteFill></Series.Sequence>
        <Series.Sequence from={179} durationInFrames={5}><AbsoluteFill style={{width:"100%",height:"100%", backgroundColor:"black"}}></AbsoluteFill></Series.Sequence>
        
  </Series>
   
   
  
}
//ddd
const StartingText3=()=>{
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s1 = interpolate(frame, [0, 30], [0, 190],{extrapolateRight:"clamp"});
  const s2 = interpolate(frame, [0, 30], [-55, -27.8],{extrapolateRight:"clamp"});
  const textstyle = {  marginTop: "58%",transform: `translateX(${s1}px)`,alignItems: "center", justifyContent: "center", color: frame>30 ? "white" : "black", fontSize: 80, fontFamily:"inter",fontWeight:"bolder"}; 
  const textstyle1 = {  marginLeft:"15%",marginTop: `${s2}%`,alignItems: "center", justifyContent: "center", color: frame>30 ? "white" : "black", fontSize: 160, fontFamily:"inter",fontWeight:"bolder"}; 
  const textstyle2 = {  marginLeft:"23%",marginTop: `${s2}%`,alignItems: "center", justifyContent: "center", color: frame>30 ? "white" : "black",fontSize: 80, fontFamily:"inter",fontWeight:"bolder"}; 
 


  return <Series>
  <Series.Sequence from={0} durationInFrames={50}>
    <div style={{ backgroundColor: frame>30 ? "black" : "white", width: "100%", height: "100%" }}>
      <Series.Sequence from={0} durationInFrames={30}>
        <div style={textstyle}>I'M 19 YEARS OLD</div>
      </Series.Sequence>
      <Series.Sequence from={30} durationInFrames={30}>
        <div style={textstyle1}>COLLEGE</div>
      </Series.Sequence>
      <Series.Sequence from={60} durationInFrames={30}>
        <div style={textstyle2}>CURRENTLY IN</div>
      </Series.Sequence>
    </div>
  </Series.Sequence>
</Series>
}
const StartingText4 = () => {
  const frame = useCurrentFrame();
  console.log(frame);
  return  <TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={80}>
  <AbsoluteFill style={{justifyContent:"center",alignItems:"center", fontFamily:"inter",fontWeight:"bolder"}}>
<div style={{fontSize:100, color:"red",marginTop:"-7%"}}>B.TECH IN</div>
<div style={{fontSize:100,marginTop:"5%",color: frame>10 ? "black":"white"}}>COMPUTER SCIENCE </div>
<div style={{fontSize:100,marginTop:"5%",color: frame>20 ? "black":"white"}}> AND</div>
<div style={{fontSize:100,marginTop:"5%",color: frame>30 ? "black":"white"}}>ENGINEERING</div>
</AbsoluteFill>
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={wipe()}
    timing={linearTiming({ durationInFrames: 30 })}
  />
  <TransitionSeries.Sequence durationInFrames={60}>
    <AbsoluteFill style={{fontWeight:"bolder",backgroundColor:frame>82 ? "white":"black",color:frame>82 ? "black":"white",fontFamily:"inter",fontSize:110,justifyContent:"center",alignItems:"center"}}>SKILLS I HAVE</AbsoluteFill>
  </TransitionSeries.Sequence>
</TransitionSeries>
    
    {/* <Sequence from={0} durationInFrames={30}>
    <div style={textstyle2}>HOW</div>
    </Sequence>
    <Sequence from={30} durationInFrames={20}>
    <div style={textstyle3}>ARE</div>
    </Sequence>
    <Sequence from={50} durationInFrames={10}>
    <div style={textstyle4}>YOU?</div>
    </Sequence> */}
        
};




// import { Audio, Composition, AbsoluteFill, useCurrentFrame, Sequence, interpolate, staticFile } from "remotion";
// import { TransitionSeries, linearTiming } from "@remotion/transitions";
// import { slide } from "@remotion/transitions/slide";
// import "./font.css";
// import Lottie from "lottie-react";
// import animationData from "./ani1.json"


// export const RemotionVideo = () => {
//   return (
//     <Composition
//       id="MyVideo"
//       component={MyComposition}
//       durationInFrames={800} // Adjust based on Lottie animation length
//       fps={30}
//       width={1920}
//       height={1080}
//     />
//   );
// };

// export const MyComposition = () => {
//   const frame = useCurrentFrame();
//   const opacity = interpolate(frame, [0, 60], [1, 0], { extrapolateRight: 'clamp' });
  
//   return (
//     <AbsoluteFill
//       style={{
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         fontFamily:"inter",
//         fontWeight:"bold",
//       }}
//     >
//        <Texteffects/>
//         <Audio src={staticFile("s1.mp3")}></Audio>
//         <Sequence from={98}>
//         <Lottie style={{paddingLeft:310,transform: `scale(1.9)`}}animationData={animationData}  loop={false} ></Lottie>
//         </Sequence>
//     </AbsoluteFill>
//   );
// };

// const Texteffects = () => {
//   const frame = useCurrentFrame();
//   const textData = [
//     'hai',
//     'my',
//     'name',
//     'is',
//     'p g',
//     'sivaranjan',
//     'i am',
//     'studying',
//     'btech in ',
//     'comuputer science',
//     'and',
//     'engineering'
//   ];

//   return (
//     <Sequence>
//       {textData.map((value, index) => {
//         // Calculate zeffect for each text element
//         const isEven = index % 2 === 0;
//         const startFrame = index * 25;
//         const endFrame = (index + 1) * 25;
//         const zeffect = interpolate(frame, [startFrame, endFrame], isEven ? [1, 2] : [2, 1], { extrapolateRight: "clamp" });

//         // Apply transform (scale) individually to each text element
//         const textstyle = {
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: 'white',
//           color: "black",
//           fontSize: 50,
//           transform: `scale(${zeffect})`
//         };

//         return (
//           <Sequence key={index} from={startFrame} durationInFrames={20}>
//             <AbsoluteFill style={textstyle}>{value.toUpperCase()}</AbsoluteFill>
//           </Sequence>
//         );
//       })}
//     </Sequence>
//   );
// };




// // const BasicTransition = () => {
// //   return (
// //     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
// //       <TransitionSeries>
// //         <TransitionSeries.Sequence durationInFrames={40}>
// //         <AbsoluteFill style={{backgroundColor:"red"}}></AbsoluteFill>

// //         </TransitionSeries.Sequence>
// //         <TransitionSeries.Transition
// //           presentation={slide()}
// //           timing={linearTiming({ durationInFrames: 30 })}
// //         />
// //         <TransitionSeries.Sequence durationInFrames={60}>
// //         <AbsoluteFill style={{color:"#0b84f3",fontSize:100}}>B</AbsoluteFill>

// //         </TransitionSeries.Sequence>
// //       </TransitionSeries>
// //     </div>
// //   );
// // };
