import React from "react"

function TodoItem(props) {

    const completedToDo = {
        color: '#cdcdcd',
        textDecoration: 'line-through'
    }

    return (

        <div className="todo-item"
          draggable={props.draggable}
          onDragStart={props.onDragStart(props.item.id)} //no arrow functions
          onDragOver={props.onDragOver()}
          onDrop={props.onDrop(props.item.id)}
        >
          <div className="todo-choose">
            <label>

                <p style = {props.item.completed ? completedToDo : null}>
                  <input
                      type="checkbox" 
                      checked={props.item.completed} 
                      onChange={ () => props.handleChange(props.item.id)}
                  />
                  {props.item.title}
                </p>
              </label>
            </div>
            <div className="todo-delete">
              <button onClick={ () => props.deleteHandler(props.item.id)}>X</button>
            </div>
          </div>


    )
}

export default TodoItem