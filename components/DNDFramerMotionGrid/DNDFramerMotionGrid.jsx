import React, { useState } from "react";
import { motion } from "framer-motion";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";

import {data} from '../../data';

function Item(props) {
    const { id, title } = props;
    const { attributes, setNodeRef, listeners, transform, isDragging } = useSortable({
        id,
        transition: null
    });
    //console.log(isDragging);
    return (
      <motion.li 
        className="flex relative flex-grow-1 items-center p-4 bg-blue-900 text-white outline-none rounded-sm border-box list-none origin-[50%, 50%] whitespace-nowrap transform "
        style={{
          touchAction: 'none',
          postion: 'relative',
          height: 140,
          width: 140,
        }}
        ref={setNodeRef}
        tabIndex={0}
        layoutId={id}
        animate={transform 
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
              boxShadow: isDragging ? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)" : undefined
            } : {
            x: 0,
            y: 0,
            scale: 1
          }}
      
        transition={{
          duration: !isDragging ? 0.25 : 0,
          easings: {
              type: "spring"
          },
          scale: {
              duration: 0.25
          },
          zIndex: {
              delay: isDragging ? 0 : 0.25
          }
        }}
        
        {...attributes}
        {...listeners}
      >
        {id}
        {title}
      </motion.li>
    );
}

export default function FramerMotion() {    
    const [items, setItems] = useState(data)
    const [filteredIds, setFilteredIds] = useState([])
    const [activeId, setActiveId] = useState(null)//being dragged

    const sensors = useSensors(useSensor(PointerSensor));

    function handleDragStart({ active }){
        //console.log(active);
        setActiveId(active.id);
    }

    function handleDragEnd({ over }){
        //console.log(over)
        // const a = items.findIndex((item) => item.id === activeId);
        // const b = items.findIndex((item) => item.id === over.id)
        setItems((items) => arrayMove(items, items.findIndex((item) => item.id === activeId), items.findIndex((item) => item.id === over.id)))
        setActiveId(null);
        console.log(items)
    }

    function addToFilteredIds(word){
      let newArrayOfItems = items.filter(item => item.tags.includes(word) === false)
      let newArrayOfItemIds = newArrayOfItems.map(item => item.id)
      setFilteredIds(newArrayOfItemIds)
    }

    function sort(){
      let sortedArrayOfItems = items.sort((a, b) => { return a.id - b.id })
      setItems((items) => arrayMove(items, items.findIndex((item) => item.id), sortedArrayOfItems.findIndex((item) => item.id)))
    }

    function shuffle(){
      let shuffledArrayOfItems = items.sort(() => Math.random() - 0.5) 
      setItems((items) => arrayMove(items, items.findIndex((item) => item.id), shuffledArrayOfItems.findIndex((item) => item.id)))
    }

    return (<>
    <div className="inline-flex justify-center w-full bg-indigo-600">
      <button className="h-20 w-20 bg-red-500" onClick={() => addToFilteredIds('clone')}>
        Clone
      </button>
      <button className="h-20 w-20 bg-green-500" onClick={() => addToFilteredIds('database')}>
        Database
      </button>
      <button className="h-20 w-20 bg-blue-500" onClick={() => addToFilteredIds('crypto')}>
        Crypto
      </button>
      <button className="h-20 w-20 bg-pink-500" onClick={() => setFilteredIds([])}>
        Show All
      </button>
      <button className="h-20 w-20 bg-orange-500" onClick={() => sort()}>
        Sort
      </button>
      <button className="h-20 w-20 bg-yellow-400" onClick={() => shuffle()}>
        Shuffle
      </button>

    </div>
      <div className="flex justify-center items-center w-full border-box p-4 bg-black">
        <DndContext collisionDetection={closestCenter} sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext strategy={rectSortingStrategy} items={items}>
          <ul className="grid grid-cols-4 gap-4 p-4">
                  {[...items]
                    .filter(item => !filteredIds.includes(item.id))// if not in filtered list
                    .map(({id, title}) => (
                      <Item
                        id={id}
                        key={id}
                        title={title}
                      />
                    ))} 
              </ul>
          </SortableContext>
        </DndContext>
      </div>
    </>);
}


// Forked from https://codesandbox.io/s/currying-night-8z16v?file=/src/FramerMotion.tsx
// Converted from TSX to JSX with ```npx tsc --jsx preserve -t es2020 --outDir js --noEmit false```
// Coverted use array of object rather than just and array indexOf => findIndex()
// Added filter/sort functionality
// Coverted CSS to use tailwind

// Would be cool to add this drop effect https://codesandbox.io/s/dnd-sortable-list-2-gvgr1