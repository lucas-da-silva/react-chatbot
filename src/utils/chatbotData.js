export const CONVERSATION_START = ['Hello', 'Good', 'I want'];
export const CONVERSATION_END = 'Goodbye';

export const ASSISTANT_QUESTIONS = ['Is a pleasure! What is your username?', 'What is your password?'];

export const LOAN_OPTIONS = [
  {
    id: 1,
    option: 'Do you want to apply for a loan?',
    response: 'Yes, I want to apply for a loan',
    description: 'If you are looking to borrow money for a specific purpose, such as buying a car or renovating your home, you might consider applying for a loan. A loan provides you with a sum of money that you agree to repay with interest over a set period.',
    reference: 'https://www.investopedia.com/loan-basics-4689731',
  },
  {
    id: 2,
    option: 'Loan conditions',
    response: 'I want to know the loan conditions',
    description: 'When considering taking out a loan, it\'s important to understand the loan conditions. Loan conditions include the interest rate, repayment terms, fees, and any collateral required. These conditions determine the overall cost of the loan and your obligations as a borrower.',
    reference: 'https://www.investopedia.com/loan-terms-5075341',
  },
  {
    id: 3,
    option: 'Help',
    response: 'I need help',
    description: 'If you have questions or need assistance regarding loans, we\'re here to help. Our team of experts can provide information about different types of loans, eligibility criteria, and the application process. Feel free to reach out to us for personalized assistance.',
    reference: 'https://www.consumerfinance.gov/',
  },
];

export const HELP_START_OPTIONS = CONVERSATION_START.map((option, index) => ({
  id: index + 1,
  option,
  response: option,
  description: ASSISTANT_QUESTIONS[index],
}));
