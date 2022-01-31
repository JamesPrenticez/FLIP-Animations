import React, { useState } from "react";
import { motion } from "framer-motion";
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import GridContainer from "./GridContainer";

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
        className="flex relative flex-grow-1 items-center p-4 bg-red-500 outline-none rounded-sm border-box list-none origin-[50%, 50%] whitespace-nowrap transform "
        style={{
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
    const [items, setItems] = useState(data);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
    }));


    function handleDragStart({ active }){
        //console.log(active);
        setActiveId(active.id);
    }

    function handleDragEnd({ over }){
        //console.log(over)
        // const a = items.findIndex((x) => x.id === activeId);
        // const b = items.findIndex((x) => x.id === over.id)
        setItems((items) => arrayMove(items, items.findIndex((x) => x.id === activeId), items.findIndex((x) => x.id === over.id)))
        console.log(items)
        setActiveId(null);
    }

    return (<>
      <button className="h-20 w-20 bg-red-500" onClick={() => setItems(arrayMove(items, 0, 7))}>
        First to last =)
      </button>
      <div className="flex justify-start w-full border-box p-4">
        <DndContext collisionDetection={closestCenter} sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext strategy={rectSortingStrategy} items={items}>
            <GridContainer columns={5}>
              {items.map(({id, title}) => (
                      <Item
                        id={id}
                        key={id}
                        title={title}
                      />
              ))}
            </GridContainer>
          </SortableContext>
        </DndContext>
      </div>
    </>);
}