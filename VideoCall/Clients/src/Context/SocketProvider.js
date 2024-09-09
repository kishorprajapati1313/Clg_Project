import React, { createContext, useContext, useMemo } from 'react'
import {io} from "socket.io-client"

const Socketcontext = createContext(null)

export const useSocket = () =>{
    const socket = useContext(Socketcontext)
    return socket;
}

export const Socketprovide = (props) =>{

    const socket = useMemo (() => io("localhost:8000"), [])
    return (
        <Socketcontext.Provider value={ socket}>
            {props.children}
        </Socketcontext.Provider>
    )
} 