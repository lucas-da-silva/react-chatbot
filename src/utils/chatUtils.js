import { LOAN_OPTIONS, CONVERSATION_START } from './chatbotData';
import { getNextMessageId } from './messageCounter';

export const createNewAssistantMessage = (content, options = null, reference = null) => {
  const newMessage = {
    id: getNextMessageId(),
    content: content || '',
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

export const createNewUserMessage = (content) => {
  const newMessage = {
    id: getNextMessageId(),
    content,
    role: 'user',
  };
  return newMessage;
};

export const responseConditions = [
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

export const firstMessage = {
  id: getNextMessageId(),
  content: 'Hello! 👋',
  role: 'assistant',
};
