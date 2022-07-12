import React, { useState } from "react";
import './App.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";

const item = {
  id: v4(),
  name: "Clean the house"
}

const item2 = {
  id: v4(),
  name: "Love BTS"
}

function App() {
  const [text, setText] = useState("");
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: [item]
    },
    "in-progress": {
      title: "In Progress",
      items: [item2]
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;

    // Creating a copy of item before removing it from state
    const itemCopy = { ...state[source.droppableId].items[source.index] }

    setState(prev => {
      prev = { ...prev }

      // remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)

      // Adding new items to the destination array
      // items.splice(1, 2, 3) 
      // 1. Destination index. We want to add this into the destination
      // 2. since we want to ADD, we set to 0
      // 3. 3rd param is the new item we want to add
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)
      return prev
    })

  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        todo: {
          title: "title",
          items: [
            {
              id: v4(),
              name: text,
            },
            ...prev.todo.items]
        }
      }
    })

    // Once new item is added to state, clear the input field
    setText("")
  }

  return (
    <div className="App">
      <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}>
                      {data.items.map((el, index) => {
                        return (
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided) => {
                              return (
                                <div
                                  className={"item"}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}>
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
