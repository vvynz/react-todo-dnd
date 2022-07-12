import React, { useState } from "react";
import './App.css';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import _ from "lodash";

function App() {
  const [state, setState] = useState({
    "todo": {
      title: "Todo",
      items: []
    },
    "in-progress": {
      title: "In Progress",
      items: []
    },
    "done": {
      title: "Completed",
      items: []
    }
  })

  return (
    <div className="App">
      <DragDropContext onDragEnd={e => console.log(e)}>
        {_.map(state, (data, key) => {
          return (
            <div className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}>

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
