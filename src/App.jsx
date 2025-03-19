import React, { useState } from 'react'; // ✅ Import useState

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("home"); // ✅ Now useState is recognized

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar setPage={setPage} />
      {page === "home" ? <Hero /> : <Login />}
      
    </div>
  );
}

export default App;
















// const data =[
//   {name:"Millionaire" , Artist:"Honey Singh" , image:"https://plus.unsplash.com/premium_photo-1676299910876-747eeb0c11dc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3F1YXJlfGVufDB8fDB8fHww" ,added:false},
//   {name:"Attention" , Artist:"Charlie Puth" , image:"https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3F1YXJlfGVufDB8fDB8fHww",added:false},
//   {name:"Brown Rang" , Artist:"Honey Singh" , image:"https://images.unsplash.com/photo-1488654715439-fbf461f0eb8d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D",added:false},
//   {name:"After Hours" , Artist:"Weeknd" , image:"https://images.unsplash.com/photo-1589149098258-3e9102cd63d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D",added:false},
//   {name:"Ankhon Ankhon" , Artist:"Honey Singh" , image:"https://plus.unsplash.com/premium_photo-1681400272268-5121ddcb9a43?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D",added:false},
//   {name:"Imaginary" , Artist:"Imraan Khan" , image:"https://images.unsplash.com/photo-1592660716763-09efba6db4e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D",added:false},
//   {name:"Vardaan" , Artist:"Carryminati" , image:"https://plus.unsplash.com/premium_photo-1683129653857-8db3e20ad791?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D",added:false},
//   {name:"Slava Funk" , Artist:"Phonk" , image:"https://images.unsplash.com/photo-1612392549296-c7623f23665a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D",added:false},
//   {name:"Diamond Ni" , Artist:"unknown" , image:"https://images.unsplash.com/photo-1573538447152-e6fe80357e8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTl8fHNxdWFyZXxlbnwwfHwwfHx8MA%3D%3D",added:false}
// ];


// const [val , setVal] = useState(data);

// const clickToChange = (changeindex)=>{
//   setVal((prev)=>{
//     return prev.map((item , index)=>{
//       if(index ===changeindex) return{...item , added : !item.added};
      
//       return item;
//     })
    
//   })
// }





// return


// <div className='h-screen w-full bg-zinc-200 flex-col'>
// <Navbar1 data={val}/>

// <div className='px-20 mt-15 flex justify-center items-center flex-wrap gap-10'>

//     {val.map((obj , index)=>(
//       <Card key={index} index={index} clickchange={clickToChange} data={obj}/>
//     ))}

// </div>


// </div>