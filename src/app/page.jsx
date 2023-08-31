import React from 'react';
import { Chat, Header } from '@/components';

export default function Home() {
  return (
    <main className="flex flex-col max-w-5xl m-auto min-h-screen">
      <Header />
      <Chat />
    </main>
  );
}
