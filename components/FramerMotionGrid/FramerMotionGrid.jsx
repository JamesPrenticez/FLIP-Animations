import { useState } from 'react'
import {data} from '../../data';
//https://www.youtube.com/watch?v=nyg5Lpl6AiM

import React from 'react'

function FramerMotionGrid() {
const [items, setItems] = useState(data)

  return (
    <div className='flex h-full justify-center items-center'>
      <div className='grid grid-cols-3 gap-4'>
        {items.map((item, index) => (
          <div 
            key={index}
            className="p-4 m-4 rounded-md bg-blue-900 text-white"
          >
            <div className="h-full w-full p-4">
              <div className="flex w-full px-2">
                {/* Small Dot */}
                <div className="w-4 m-2 rounded-full" style={{background: color}}></div>
                <h3 className="text-2xl">{title}</h3>
              </div>

              {/* Image */}
              <div>
                <img className="h-full w-full m-auto rounded-sm px-4 py-3" src='/default-image.jpg' alt="" />
              </div>

              {/* SubTitle */}
              <div className="h-[4rem] px-4">
                <p className="italic text-gray-100 font-thin">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FramerMotionGrid