import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import GridContainer from "./GridContainer";

//const Wrapper = "<div className='flex justify-start w-full border-box p-4'></div>"

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  justify-content: flex-start;
`;

//console.log(Wrapper)

//const ItemContainer = <motion.li className="flex relative flex-grow-1 items-center p-4 bg-red-500 outline-none rounded-sm border-box list-none origin-[50%, 50%] whitespace-nowrap transform transition-shadow"> </motion.li>

const ItemContainer = styled(motion.li)`
  position: relative;
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 18px 20px;
  background-color: red;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;
  list-style: none;
  transform-origin: 50% 50%;
  -webkit-tap-highlight-color: transparent;
  font-size: 1rem;
  white-space: nowrap;
  transform: "1";
  transition: box-shadow 200ms cubic-bezier(0.18, 0.67, 0.6, 1.22);
`;

const baseStyles: React.CSSProperties = {
  position: "relative",
  width: 140,
  height: 140
};

const initialStyles = {
  x: 0,
  y: 0,
  scale: 1
};

interface ItemProps {
  id: string;
}

function Item(props: ItemProps) {
  const { id } = props;
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    isDragging
  } = useSortable({
    id,
    transition: null
  });

  //console.log(isDragging);

  return (
    <ItemContainer
      style={baseStyles}
      ref={setNodeRef}
      tabIndex={0}
      layoutId={id}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
              boxShadow: isDragging
                ? "0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)"
                : undefined
            }
          : initialStyles
      }
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
    </ItemContainer>
  );
}

const defaultInitializer = (index: number) => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

export default function FramerMotion() {
  const [items, setItems] = useState(() =>
    createRange<string>(16, (index) => (index + 1).toString())
  );
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  function handleDragStart({ active }) {
    //console.log(active);
    setActiveId(active.id);
  }

  function handleDragEnd({ over }: DragEndEvent) {
    setItems((items) =>
      arrayMove(items, items.indexOf(activeId), items.indexOf(over!.id))
    );
    setActiveId(null);
  }

  return (
    <>
      <button
        onClick={() => setItems(arrayMove(["1", "2", "3"], 0, 2))}
        style={{ height: "100px", width: "100px" }}
      >
        hi
      </button>
      <Wrapper>
        <DndContext
          collisionDetection={closestCenter}
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext strategy={rectSortingStrategy} items={items}>
            <GridContainer columns={5}>
              {items.map((id) => (
                <Item key={id} id={id} />
              ))}
            </GridContainer>
          </SortableContext>
        </DndContext>
      </Wrapper>
    </>
  );
}
