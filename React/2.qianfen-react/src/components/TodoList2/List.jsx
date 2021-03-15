import React from 'react'

export default function List(props) {
  return (
    <div>
      <ul>
        {
          props.list.map(item => <li key={item.id}>{item.title}<span onClick={props.onDeleteItem(item.id)}>X</span></li>)
        }
      </ul>
    </div>
  )
}
