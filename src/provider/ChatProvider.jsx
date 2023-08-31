'use client';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ChatContext from './ChatContext';
import { CONVERSATION_END, CONVERSATION_START, LOAN_OPTIONS } from '../lib/chatbotData';

let messageIdCounter = 1;
const firstMessage = {
  id: messageIdCounter,
  content: 'Hello! 👋',
  role: 'assistant',
};

const createNewAssistantMessage = (content, options = null, reference = null) => {
  const newMessage = {
    id: messageIdCounter += 1,
    content,
    role: 'assistant',
  };

  if (options) {
    newMessage.options = options;
  }
  if (reference) {
    newMessage.reference = reference;
  }

  return newMessage;
};

const createNewUserMessage = (content) => {
  const newMessage = {
    id: messageIdCounter += 1,
    content,
    role: 'user',
  };
  return newMessage;
};

const responseConditions = [
  {
    check: (message, _) => CONVERSATION_START.includes(message),
    response: () => ({ content: 'Is a pleasure! What is your username?' }),
  },
  {
    check: (_, question) => question.includes('username'),
    response: () => ({ content: 'What is your password?' }),
  },
  {
    check: (_, question) => question.includes('password'),
    response: (context) => ({
      content: `Welcome ${context.user}! I'm your assistant, how can I help you?`,
    }),
  },
  {
    check: (message, _) => LOAN_OPTIONS.some(({ response }) => response === message),
    response: (context) => {
      const loanOption = LOAN_OPTIONS.find(({ response }) => response === context.message);
      return {
        content: loanOption.description,
        reference: loanOption.reference,
      };
    },
  },
  {
    check: (message, _) => message.includes('loan'),
    response: () => ({
      content: 'Loan options:',
      options: LOAN_OPTIONS,
    }),
  },
];

export default function ChatProvider({ children }) {
  const [historicMessages, setHistoricMessages] = useState([]);
  const [messages, setMessages] = useState([firstMessage]);
  const [user, setUser] = useState('');

  const getBotResponse = (message) => {
    setTimeout(() => {
      const lastMessage = messages[messages.length - 1].content;
      if (lastMessage.includes('username')) {
        setUser(message);
      }

      const isResponse = responseConditions.find(({ check }) => check(message, lastMessage));

      if (isResponse) {
        const response = isResponse.response({ user, message });
        setMessages((prevMessages) => [
          ...prevMessages,
          createNewAssistantMessage(response.content, response.options, response.reference)]);
      }
    }, 1000);
  };

  const finishConversation = () => {
    setMessages((prevMessages) => [...prevMessages, createNewAssistantMessage('Bye! 👋')]);
    setHistoricMessages((prevMessages) => [...prevMessages, {
      id: prevMessages.length + 1,
      title: `Conversation ${user || 'user'} #${prevMessages.length + 1} - ${new Date().toLocaleString()}`,
      messages,
    }]);
    setUser('');
    setTimeout(() => {
      setMessages([firstMessage]);
    }, 3000);
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
      { messages, sendMessage, historicMessages }),
    [messages, sendMessage, historicMessages],
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
