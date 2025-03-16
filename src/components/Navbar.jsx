import React from 'react'
import styles from "./style.module.css"

function Navbar({data}) {
  return (
    <div className='p-3 h-12 w-full shadow flex'>
      <div className=' px-6 h-full w-[85%]'>
        <h3 className={styles.a}>Orange</h3>
        
      </div>
      <div className=''>
       <div className='h-7 w-25 bg-red-500 flex justify-center items-center rounded-md gap-3 text-white font-semibold text-xs'>
        <h3 className=''>Favourites</h3>
        <h4>{data.filter(item=> item.added).length}</h4>
       </div>
      </div>
    </div>
  )
}

export default Navbar
