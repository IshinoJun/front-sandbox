
import { Box, HStack } from '@chakra-ui/react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { NoSSR } from '../components/NoSSR';

interface Item {
  id: string,
  content: string
}

// fake data generator
const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom: Item = {
    id: `id-${k}`,
    content: `Item ${k}`
  };

  return custom;
});

const grid = 8;

const reorder = (list: {
  id: string;
  content: string;
}[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const Dd: NextPage = () => {
  const [items, setItems] = useState(initial);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const nextItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(nextItems);
  }

  const onDragStart = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }

  return (
    <NoSSR>
      <HStack justifyContent="center" marginTop={10}>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable droppableId="list">
            {provided => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {items.map((quote: Item, index: number) => (
                  <Draggable draggableId={quote.id} index={index} key={quote.id}>
                    {provided => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        width={200}
                        marginBottom={`${grid}px`}
                        backgroundColor="lightblue"
                        padding={`${grid}px`}
                        border={"1px solid grey"}
                      >
                        {quote.content}
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext >
      </HStack>
    </NoSSR>
  );

}
export default Dd;