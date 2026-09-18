"use strict";
importScripts("./engine.5a3ee22671286ad0.js");
onmessage=async ({data})=>{try{MHNEngine.configure(data.input);let evaluated=0;const results=await MHNEngine.enumerate(data.req,message=>{const m=message.match(/最終評価中… (\d+)/);if(m)evaluated=Number(m[1]);postMessage({type:"progress",message})});postMessage({type:"done",results,evaluated:Math.max(evaluated,results.length)})}catch(e){postMessage({type:"error",message:e.message})}};
