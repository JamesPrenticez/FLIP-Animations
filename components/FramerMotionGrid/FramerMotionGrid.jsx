import { useState, useEffect } from "react";
import { data } from "../../data";
import Link from "next/Link";
import {motion, AnimatePresence} from 'framer-motion'
//https://www.youtube.com/watch?v=nyg5Lpl6AiM

import React from "react";

function FramerMotionGrid() {
  const [items, setItems] = useState(data);
  const [filtered, setFiltered] = useState(items)
  const [active, setActive] = useState('all')

  useEffect(() => {
    if(active === 'all') setFiltered(items)
    const filteredItems = items.filter((item) => item.tags.includes(active))
    setFiltered(filteredItems)
  }, [active])


  return (
    <div className="w-full min-h-screen bg-black p-12">
      {/* Filter Buttons */}
      <div className="w-full h-full px-4 space-x-4 text-white p-6">
        <button onClick={() => setActive('all')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Show All</button>
        <button onClick={() => setActive('hobby')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Hobby</button>
        <button onClick={() => setActive('clone')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Clone</button>
        <button onClick={() => setActive('database')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Database</button>
        <button onClick={() => setActive('authentication')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Authenication</button>
        <button onClick={() => setActive('crypto')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Crypto</button>
        <button onClick={() => setActive('ecommerce')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Ecommerce</button>
      </div>

      <motion.div layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 md:pd-6"
      >
        {/* Post Display Card */}
        <AnimatePresence>
        {filtered.map((item, index) => {
          return (
            <motion.div layout
              key={index}
              animate = {{ opacity: 1}}
              initial = {{ opacity: 0}}
              exit = {{ opacity: 0}}
              className="p-[2px] rounded-lg h-full w-full"
              style={{backgroundImage: item.color}}
              >
              <div className="overflow-hidden rounded-lg ">
                <div 
                  className="group overflow-hidden border-b-2"
                  style={{borderColor: 'transparent'}}
                >
                  <Link href={`/`}>
                    <img
                      className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                      src={item.image || "/default-image.jpg"}
                    />
                  </Link>
                </div>

                <div className="p-2 h-[6rem] bg-black">
                  <div 
                    className="bg-clip-text text-transparent"
                    style={{backgroundImage: item.color}}
                  >
                    <p className="text-[1.125rem] font-bold ">{item.title}</p>
                    <p className="text-[1rem]">{item.desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            )
          }
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default FramerMotionGrid;
