import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ChatContext from './ChatContext';
import { CONVERSATION_START, LOAN_OPTIONS } from '../lib/chatbotData';

let messageIdCounter = 1;

const createNewAssistantMessage = (content, options, reference) => {
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
  const [messages, setMessages] = useState([
    {
      id: messageIdCounter,
      content: 'Hello! 👋',
      role: 'assistant',
    },
  ]);
  const [user, setUser] = useState('');

  const getBotResponse = (message) => {
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
  };

  const sendMessage = (message) => {
    if (!messages[messages.length - 1].content.includes('password')) {
      setMessages((prevMessages) => [...prevMessages, createNewUserMessage(message)]);
    }

    getBotResponse(message);
  };

  const contextType = useMemo(() => ({ messages, sendMessage }), [messages, sendMessage]);

  return (
    <ChatContext.Provider value={contextType}>
      {children}
    </ChatContext.Provider>
  );
}

ChatProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
