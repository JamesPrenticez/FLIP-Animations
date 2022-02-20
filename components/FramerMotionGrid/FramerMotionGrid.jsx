import { useState, useEffect } from "react";
import { data } from "../../data";
import Link from "next/Link";
//https://www.youtube.com/watch?v=nyg5Lpl6AiM

import React from "react";

function FramerMotionGrid() {
  const [items, setItems] = useState(data);
  const [filtered, setFiltered] = useState(data)
  const [active, setActive] = useState('all')

  useEffect(() => {
    if(active === 0) setFiltered(items)
    const filteredItems = items.filter((item) => item.tags.includes(active))
    setFiltered(filteredItems)
  }, [active])


  return (
    <div className="w-full min-h-screen bg-black p-12">
      {/* Filter Buttons */}
      <div className="w-full h-full px-4 space-x-4 text-white p-6">
        <button onClick={() => setFiltered(items)} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Show All</button>
        <button onClick={() => setActive('hobby')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Hobby</button>
        <button onClick={() => setActive('clone')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Clone</button>
        <button onClick={() => setActive('database')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Database</button>
        <button onClick={() => setActive('authentication')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Authenication</button>
        <button onClick={() => setActive('crypto')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Crypto</button>
        <button onClick={() => setActive('ecommerce')} className="w-32 h-16 border-2 border-white rounded-lg hover:text-black hover:bg-white">Ecommerce</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 md:pd-6">
        {/* Post Display Card */}
        {filtered.map((item, index) => (
          <Link key={index} href={`/`}>
            <div
              className="p-[2px] rounded-lg"
              style={{backgroundImage: item.color}}
            >
              <div className="bg-white overflow-hidden rounded-lg">
                <div className="group overflow-hidden">
                  <img
                    className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                    src="/default-image.jpg"
                    />
                </div>

                <div className="p-2 h-[6rem]">
                  <p className="text-[1.125rem] font-bold">{item.title}</p>
                  <p className="text-[1rem]">{item.desc}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default FramerMotionGrid;


// <div
//   key={index}
//   className="p-4 m-4 rounded-md bg-blue-900 text-white h-4/6"
// >
//     <div className="flex w-full px-2 ">
//       {/* Small Dot */}
//       <div className="w-4 m-2 rounded-full" style={{background: item.color}}></div>
//       <h3 className="text-2xl">{item.title}</h3>
//     </div>

//     {/* Image */}
//     <div>
//       <img className="w-full m-auto rounded-sm px-4 py-3" src='/default-image.jpg' alt="" />
//     </div>

//     {/* SubTitle */}
//     <div className="px-4">
//       <p className="italic text-gray-100 font-thin">{item.desc}</p>
//     </div>
// </div>
