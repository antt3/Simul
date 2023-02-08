import { createContext, useContext, useState } from 'react';

export const ChannelContext = createContext();

export const useChannel = () => useContext(ChannelContext);

export default function ChannelProvider({ children }) {
    const [currentChannel, setCurrentChannel] = useState([ "C", 1 ]);

    return (
        <ChannelContext.Provider
            value={{
                currentChannel,
                setCurrentChannel
            }}
        >
            {children}
        </ChannelContext.Provider>
    );
}