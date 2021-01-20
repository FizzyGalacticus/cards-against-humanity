'use strict';

import React, { useState, useCallback } from 'react';

import { SocketProvider, useSocketEvent } from './util/socket';

const App = () => {
    const [serverMessages, setServerMessages] = useState([]);

    const onMessageServer = useCallback(
        message => {
            setServerMessages([...serverMessages, message]);
        },
        [serverMessages]
    );

    useSocketEvent('message', onMessageServer);

    return (
        <SocketProvider>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-2">
                    <h3 className="text-2xl">Messages from server</h3>
                    {serverMessages.map((message, idx) => (
                        <div key={idx} className="text-pink-700">
                            {message}
                        </div>
                    ))}
                </div>
            </div>
        </SocketProvider>
    );
};

export default App;
