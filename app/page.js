"use client"
import { useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const [title, settitle] = useState("")
  const [desc, setdesc] = useState("")
  const [mainTask, setMainTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    setMainTask([...mainTask, { title, desc }]); //mainTaski is a kind of container jisme naya data add on ho raha hai
    settitle("")
    setdesc("")
    console.log(mainTask)
  }
  const deleteHandler = (i) => {
    let copytask = [...mainTask]
    copytask.splice(i, 1)
    setMainTask(copytask)
  }

  let renderTask = <h2>No Tasks Available</h2>

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => { //har baar jo object aa raha hai woh t hai // i->index
      return (
        <li key={i} className='flex items-center justify-between mb-5'>
          <div className=' w-2/3'>
            <h5 className='text-2xl font-semibold'>{t.title}</h5>
            <p className='text-lg font-medium'>{t.desc}</p>
          </div>
          <button
            onClick={() => {
              deleteHandler(i)
            }}
            className='bg-red-400 text-white px-4 py-2 rounded font-bold '>Delete</button>
        </li>
      );
    });
  }
  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>To Do List</h1>
      <form onSubmit={submitHandler}>
        <input type="text" className='text 2xl: border-zinc-800 border-2 m-8 px-4 py-2' placeholder='Enter Title Here'
          value={title}
          onChange={(e) => {
            settitle(e.target.value)
          }}
        />
        <input type="text" className='text 2xl: border-zinc-800 border-2 m-8 px-4 py-2' placeholder='Enter Description Here'
          value={desc}
          onChange={(e) => {
            setdesc(e.target.value)
          }} />

        <button className='bg-black text-white px-4 py-2 text-2xl font-bold rounded m-5'>Add Task</button>

      </form>
      <hr />
      <div className='p-8 bg-slate-200'>
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default page
