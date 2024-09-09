import React, { useState, useCallback, useEffect } from 'react'
import { useSocket } from "../Context/SocketProvider"
import { useNavigate } from 'react-router-dom'

const Lobby = () => {
  const [email, setemail] = useState("")
  const [room, setroom] = useState("")
  const navigate =useNavigate();

  const socket = useSocket()

  // console.log(socket)

  const handlesubmit = useCallback((e) => {
    e.preventDefault();
    socket.emit("room:join", { email, room });
  }, [email, room, socket]);

  const handlejoinRoom = useCallback((data) => {
    const {email, room} = data
    // console.log(email, room)
    navigate(`/room/${room}`)
  }, [])
  
  useEffect(() => {
    socket.on('room:join', handlejoinRoom);
    return () =>{
      socket.off("room:join",handlejoinRoom)
    }
  }, [socket, handlejoinRoom])
  
return (
  <div>
    <h1>Lobby</h1>
    <form onSubmit={handlesubmit}>
      <label htmlFor="email">Email Address:</label>
      <input type="email" id="email" value={email} onChange={e => setemail(e.target.value)} />
      <br />
      <label htmlFor="email">Room Number:</label>
      <input type="text" id="room" value={room} onChange={e => setroom(e.target.value)} />
      <br />
      <button>Join</button>
    </form>
  </div>
)
}

export default Lobby