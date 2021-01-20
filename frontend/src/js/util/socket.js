import { useEffect } from 'react';
import { io } from 'socket.io-client';

import { getApiBase } from './api';

const socket = io(getApiBase());

export const useSocket = () => socket;

export const useSocketEvent = (event, callback, deps = []) =>
    useEffect(() => {
        socket.on(event, callback);

        return () => socket.off(event, callback);
    }, [event, callback, ...deps]);
