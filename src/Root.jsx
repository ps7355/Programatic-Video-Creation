import { AbsoluteFill, Composition, staticFile,interpolate,useCurrentFrame, Sequence } from "remotion";
import { Img } from "remotion";
import { StaticFile,useVideoConfig } from "remotion";
import { Audio } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import "./font.css";



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
      <StartingText/>
      </Sequence>
      <Sequence from={120}>
        <Demo/>
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

const StartingText = () => {
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
    {/* <Sequence from={60}>
      <div style={textstyle5}>FINE?</div>
    </Sequence> */}
    {/* <Sequence>
      <div>GOOD?</div>
    </Sequence>
    <Sequence>
      <div>GREAT?</div>
    </Sequence> */}
    
    </div>
};

const Demo=()=>{
  const frame = useCurrentFrame();
  const s2 = interpolate(frame, [0, 5], [0, 400], { extrapolateRight: "clamp" });
  
  const textstyle5 = { marginTop:"43%",transform: `translateX(${s2}px)`,alignItems: "center", justifyContent: "center", backgroundColor: 'white', color: 'black', fontSize: 110, fontFamily:"inter",fontWeight:"bolder"};   
  return <div>
    <Sequence from={0}>
      <div style={textstyle5}>FINE?</div>
    </Sequence>
  </div>
}




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
