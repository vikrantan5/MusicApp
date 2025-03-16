import React from 'react'

function Card({data , clickchange , index}) {
   const {name , Artist , image , added} = data;
  return (
    <div className='p-3 h-30 w-62 bg-zinc-100 rounded-md flex gap-3 shadow mt-8 '>
        <div className='h-20 w-20 bg-orange-400 rounded-md overflow-hidden'>
            <img className='w-full h-full object-cover' src={image} alt="" />
        </div>
        <div className=' p-2'>
        <h1 className='font-bold text-xl'>{name}</h1>
        <h5 className='text-xs'>{Artist}</h5>
        </div>
      <button onClick={()=>clickchange(index)} className={`h-10 w-40 text-xs text-white ${added ? "bg-teal-500" : "bg-orange-500"} absolute rounded-full shadow translate-x-[20%] translate-y-[240%]`}>{added ===false ? "Add to Favourites" : "Added"}</button>
    </div>
  )
}

export default Card
