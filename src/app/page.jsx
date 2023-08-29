'use client';

import React from 'react';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <main className="flex min-h-screen bg-slate-50 items-center justify-center">
      <Chat />
    </main>
  );
}
