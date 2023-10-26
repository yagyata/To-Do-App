"use client"
import { useSelectedLayoutSegments } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [mainTask, setMainTask] = useState([])

  const submitHandler = (e) => {
    e.preventDefault()
    setMainTask([...mainTask, { title, desc }]);
    setTitle("")
    setDesc("")
  }

  const deleteHandler = (i) => {
    let copyTask = [...mainTask]
    copyTask.splice(i, 1)
    setMainTask(copyTask)
  }

  const moveTaskUp = (index) => {
    if (index > 0) {
      const copyTask = [...mainTask];
      const temp = copyTask[index];
      copyTask[index] = copyTask[index - 1];
      copyTask[index - 1] = temp;
      setMainTask(copyTask);
    }
  };

  const moveTaskDown = (index) => {
    if (index < mainTask.length - 1) {
      const copyTask = [...mainTask];
      const temp = copyTask[index];
      copyTask[index] = copyTask[index + 1];
      copyTask[index + 1] = temp;
      setMainTask(copyTask);
    }
  };

  let renderTask = <h2>No Tasks Available</h2>

  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className='flex items-center justify-between mb-5'>
          <div className='w-2/3'>
            <h5 className='text-2xl font-semibold'>{t.title}</h5>
            <p className='text-lg font-medium'>{t.desc}</p>
          </div>
          <div className='flex'>
            <button
              onClick={() => moveTaskUp(i)}
              className='bg-blue-500 text-white px-4 py-2 mx-1 rounded font-bold'
              disabled={i === 0}> ⬆
            </button>
            <button
              onClick={() => moveTaskDown(i)}
              className='bg-green-500 text-white px-4 py-2 mx-1 rounded font-bold'
              disabled={i === mainTask.length - 1}>⬇
            </button>
            <button
              onClick={() => deleteHandler(i)}
              className='bg-red-500 text-white px-4 py-2 mx-1 rounded font-bold'>
              Delete
            </button>
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>To Do List</h1>
      <form onSubmit={submitHandler}>
        <input type="text" className='text-2xl border-zinc-800 border-2 m-8 px-4 py-2' placeholder='Enter Title Here'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <input type="text" className='text-2xl border-zinc-800 border-2 m-8 px-4 py-2' placeholder='Enter Description Here'
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value)
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

export default Page;
