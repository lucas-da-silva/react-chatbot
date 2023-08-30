import React from 'react';
import { Chat, Header } from '../components';
import { ChatProvider } from '../provider';

export default function Home() {
  return (
    <main className="flex max-w-5xl m-auto flex-col min-h-screen bg-slate-50 items-center justify-center">
      <Header />
      <ChatProvider>
        <Chat />
      </ChatProvider>
    </main>
  );
}
