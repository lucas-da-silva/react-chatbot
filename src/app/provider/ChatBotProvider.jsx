import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ChatBotContext from './ChatBotContext';

export default function ChatBotProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const sendMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const contextType = useMemo(() => ({ messages, sendMessage }));

  return (
    <ChatBotContext.Provider value={contextType}>
      {children}
    </ChatBotContext.Provider>
  );
}

ChatBotProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
