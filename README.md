# Web interactive chatbot

The chatbot aims to simulate natural conversations with users, offering information and assistance related to topics such as loans and general assistance. Through a friendly interface, users can exchange messages with the chatbot, ask questions, get answers and even perform actions such as downloading conversation history in CSV format.

## Features

- Ask questions and get answers
- Download chat history in CSV format

## Technologies used

- [React](https://pt-br.reactjs.org/) - JavaScript library for creating user interfaces
- [Next.js](https://nextjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS

## Run locally

Clone the project

```bash
git clone https://github.com/lucas-da-silva/react-chatbot.git
```

Go to project directory

```bash
cd react-chatbot
```

Install the dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

## Project structure

```
$PROJECT_ROOT
└── src
    ├── app        # Pages components
    ├── components # UI components
    ├── lib        # Utils functions
    └── provider   # React Context API
```
