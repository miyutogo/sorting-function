import React from 'react'

function Display({item, key}) {
  return (
        <tr key={key}>
         <td>{item.category}</td>
         <td>{item.price}</td>
         <td>{item.manufacturer}</td>
         <td>{item.createdAt}</td> 
       </tr> 
  )
}

export default Display
