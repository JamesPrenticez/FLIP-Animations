

import { forwardRef, useState } from "react";
//import "./styles.css";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  SortableContext,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div
      className="bg-red-600 w-[400px] h-[400px]"
      {...props}
      ref={ref}
    >
      {id}
    </div>
  );
});

const SortableItem = ({ id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      id={id}
    />
  );
};
export default function DNDGrid() {
  const [data, setData] = useState(["1", "2", "3", "4", "5", "6"]);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <div className="bg-gray-100 w-screen h-screen flex items-center justify-center">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={(event) => {
          setActiveId(event.active.id);
        }}
        onDragEnd={({ active, over }) => {
          if (!over) return null;
          if (active.id === over.id) return null;
          const items = data;
          const oldIndex = items.indexOf(active.id);
          const newIndex = items.indexOf(over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);
          setData(newItems);
          setActiveId(null);
        }}
      >
        <div className="w-4/6 h-4/6 flex justify-center flex-wrap -mt-40">
          <div className="h-20 w-full bg-black mb-4">
            <button 
              className="bg-green-700 h-full w-1/6 text-yellow-300"
              onClick={() => setData(arrayMove(["1", "2", "3", "4", "5", "6"], 0, 5))}
            >
              FILTER
            </button>            
          </div>
            <div className="grid items-center max-w-full grid-cols-3 grid-rows-2 gap-4">
            <SortableContext items={data} strategy={rectSortingStrategy}>
              {data.map((item, index) => {
                return (
                  <SortableItem
                    id={item}
                    key={item}
                    isDragging={activeId === item}
                  />
                );
              })}
            </SortableContext>
          </div>
        </div>
          <DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
        </DndContext>
    </div>
  );
}
