import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

import { getApiBase } from './api';

export const socket = io(getApiBase());

const SocketContext = createContext();

export const SocketProvider = ({ children }) => (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => useContext(SocketContext);

export const useSocketEvent = (event, callback, deps = []) =>
    useEffect(() => {
        socket.on(event, callback);

        return () => socket.off(event, callback);
    }, [event, callback, ...deps]);
