import React, { useState } from 'react'

export default function Login({onSubmit}) {
    const [username, setUsername] = useState('')

  return (
    <div>
        <h1>Hello, what can we call you</h1>

        <form onSubmit={e=>{
            e.preventDefault()
            onSubmit(username)
        }}>
            <input type="text" value={username} onChange={e=>setUsername(e.target.value)} />

            <input type="submit" />
        </form>
    </div>
  )
}
