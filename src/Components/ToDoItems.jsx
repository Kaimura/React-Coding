import React from "react"

function TodoItem(props) {

    const completedToDo = {
        color: '#cdcdcd',
        textDecoration: 'line-through'
    }

    return (

        <div className="todo-item"
          draggable={props.draggable}
          onDragStart={(event) => props.onDragStart(props.item.id, event)}
          onDragOver={(event) => props.onDragOver(event)}
          onDrop={(event) => props.onDrop(props.item.id, event)}
        >
          <div className="todo-choose">
            <label>

                <li style = {props.item.completed ? completedToDo : null}>
                  <input
                      type="checkbox" 
                      checked={props.item.completed}
                      onChange={ () => props.handleChange(props.item.id)}
                  />
                  {props.item.title}
                </li>
              </label>
            </div>
            <div className="todo-delete">
              <button onClick={ () => props.deleteHandler(props.item.id)}>X</button>
            </div>
          </div>


    )
}

export default TodoItem