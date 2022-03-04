const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];
import {animate, Reorder, useMotionValue} from "framer-motion"
import React, { useEffect, useState } from 'react';

function useRaisedShadow(value){
  const inactiveShadow = "0px 0px 0px rgba(0,0,0,0.8)";
  const boxShadow = useMotionValue(inactiveShadow)

  useEffect(() => {
    let isActive = false;
    value.onChange((latest) => {
      const wasActive = isActive
      if(latest !== 0){
        isActive = true
      if(isActive !== wasActive){
        animate(boxShadow, "5px 5px 10px rgba(0,0,0,0.3)")
        }
      } else {
        isActive = false
        if(isActive !== wasActive){
          animate(boxShadow, inactiveShadow)
        }
      }
    })
  },[value, boxShadow])

  return boxShadow
}

function Item ({item}){
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y);

  return(
    // <li></li>
    <Reorder.Item value={item} id={item} style={{boxShadow, y}} className="bg-white w-full p-4 rounded-sm text-3xl hover:cursor-pointer">
      <span>{item}</span>
    </Reorder.Item>
  )
}

function List(){
  const [items, setItems] = useState(initialItems)

  return (
    <main className='bg-[#ffaa00] h-screen w-full flex justify-center items-center'>
        {/* <ul></ul> */}
        <Reorder.Group axis="y" onReorder={setItems} values={items} className="bg-red-500 w-5/6 flex flex-wrap space-y-2">
          {items.map((item) => (
            <Item key={item} item={item} />
          ))}
        </Reorder.Group>
    </main>
  )
}

export default List