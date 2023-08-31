'use client';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  CONVERSATION_END,
  HELP_START_OPTIONS,
  createNewAssistantMessage,
  createNewUserMessage,
  firstMessage,
  responseConditions,
  resetMessageIdCounter,
} from '@/utils';
import ChatContext from './ChatContext';

export default function ChatProvider({ children }) {
  const [historicMessages, setHistoricMessages] = useState([]);
  const [messages, setMessages] = useState([firstMessage]);
  const [user, setUser] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFinishedConversation, setIsFinishedConversation] = useState(false);

  const handleAssistantResponse = (response) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      createNewAssistantMessage(response.content, response.options, response.reference),
    ]);
  };

  const handleFallbackAssistantResponse = () => {
    if (!user) {
      setMessages((prevMessages) => [
        ...prevMessages, createNewAssistantMessage(null, HELP_START_OPTIONS),
      ]);
    } else {
      setMessages((prevMessages) => [...prevMessages, createNewAssistantMessage(null, [{
        id: 1, option: 'Loan', response: 'loan', description: 'Loan',
      }])]);
    }
  };

  const getBotResponse = (message) => {
    setIsTyping(true);
    setTimeout(() => {
      const lastMessage = messages[messages.length - 1].content;

      if (lastMessage.includes('username')) {
        setUser(message);
      }

      const isResponse = responseConditions.find(({ check }) => check(message, lastMessage));

      if (isResponse) {
        const response = isResponse.response({ user, message });
        handleAssistantResponse(response);
      } else {
        handleFallbackAssistantResponse();
      }

      setIsTyping(false);
    }, 1000);
  };

  const finishConversation = () => {
    setIsFinishedConversation(true);
    setMessages((prevMessages) => [...prevMessages, createNewAssistantMessage('Bye! 👋')]);
    setHistoricMessages((prevMessages) => [...prevMessages, {
      id: prevMessages.length + 1,
      title: `Conversation ${user || 'user'} #${prevMessages.length + 1} - ${new Date().toLocaleString()}`,
      messages,
    }]);
    setUser('');
    setTimeout(() => {
      resetMessageIdCounter();
      setMessages([firstMessage]);
      setIsFinishedConversation(false);
    }, 2000);
  };

  const sendMessage = (message) => {
    const lastMessage = messages[messages.length - 1].content;

    if (!lastMessage.includes('password')) {
      setMessages((prevMessages) => [...prevMessages, createNewUserMessage(message)]);
    }

    if (message === CONVERSATION_END) {
      finishConversation();
    } else {
      getBotResponse(message);
    }
  };

  const contextType = useMemo(
    () => (
      {
        messages, sendMessage, historicMessages, isTyping, isFinishedConversation,
      }),
    [messages, sendMessage, historicMessages, isTyping, isFinishedConversation],
  );

  return (
    <ChatContext.Provider value={contextType}>
      {children}
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
