import React from "react"

function TodoItem(props) {

    const completedToDo = {
        // background: '#f4f4f4',
        // padding: '1em',
        // borderBottom: '1px #ccc dotted',
        color: '#cdcdcd',
        textDecoration: 'line-through'
    }

    return (

        <div className="todo-item"
          draggable={props.draggable}
          onDragStart={props.onDragStart({ id: props.item.id })}
          onDragOver={props.onDragOver({ id: props.item.id })}
          onDrop={props.onDrop({ id: props.item.id })}
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