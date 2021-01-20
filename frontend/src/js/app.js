'use strict';

import React, { useState, useCallback } from 'react';

import { useSocket } from './util/socket';

const App = () => {
    const socket = useSocket();

    const [name, setName] = useState();
    const [roomCode, setRoomCode] = useState('');

    const onNameChange = useCallback(({ target: { value } }) => setName(value), []);

    const onRoomCodeChange = useCallback(({ target: { value } }) => setRoomCode(value), []);

    const requestJoinGame = useCallback(() => {
        socket.emit('join', roomCode);
    }, [roomCode, socket]);

    return (
        <div className="container flex flex-col justify-around mx-auto h-screen">
            <div className="grid grid-cols-1 gap-8">
                <input
                    className="rounded-md text-blue-500 placeholder-blue-400 text-5xl border border-blue-500 shadow"
                    value={name}
                    placeholder={`Name`}
                    onChange={onNameChange}
                />
                <input
                    className="rounded-md text-blue-500 placeholder-blue-400 text-5xl border border-blue-500 shadow"
                    value={roomCode}
                    placeholder={`Room Code`}
                    onChange={onRoomCodeChange}
                />
                <button
                    className="rounded-md text-white bg-blue-500 text-5xl hover:text-blue-500 hover:bg-white"
                    onClick={requestJoinGame}
                >
                    JOIN
                </button>
            </div>
        </div>
    );
};

export default App;
