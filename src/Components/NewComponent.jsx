import React, { useState } from 'react'

function NewComponent() {
    const [title , SetTitle] = useState('')
    const [pic , SetPic] = useState()
  return (
    <div className='bg-primary'>
      <input type="text" placeholder='title'value={title} onChange={(e) => SetTitle(e.target.value)}/>
      <br />
      <br />
      <input type="file" placeholder='img' value={pic} onChange={(e) => SetPic(e.target.value)}/>
      <br />
      <br />
      <button onClick={(e) => {
        e.preventDefault()
        console.log(pic);
      }}>submit</button>
    </div>
  )
}

export default NewComponent
