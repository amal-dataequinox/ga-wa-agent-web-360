import React,{ useContext, useEffect, useState } from "react";
import io from "socket.io-client";
const SocketContext = React.createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: any) => {
  const [socket, setSocket] = useState();
  useEffect(() => {
    const socket = io("wss://ws.telinfy.net");
    setSocket(socket);
    return () => socket.close();
  }, []);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
