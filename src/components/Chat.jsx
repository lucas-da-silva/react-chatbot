'use client';

import React, { useContext, useState } from 'react';
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription,
} from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import BotCardContent from './BotCardContent';
import BotMessageWithOptions from './BotMessageWithOptions';
import UserMessage from './UserMessage';
import { ChatContext } from '../provider';
import BotMessageWithReference from './BotMessageWithReference';

export default function Chat() {
  const { messages, sendMessage } = useContext(ChatContext);
  const [chatInput, setChatInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage(chatInput);
    setChatInput('');
  };

  const renderBotMessage = (message) => {
    if (message.options) {
      return (
        <BotMessageWithOptions
          key={message.id}
          message={message.content}
          options={message.options}
        />
      );
    }
    if (message.reference) {
      return (
        <BotMessageWithReference
          key={message.id}
          message={message.content}
          reference={message.reference}
        />
      );
    }

    return <BotCardContent key={message.id}>{message.content}</BotCardContent>;
  };

  return (
    <section className="self-center">
      <Card className="w-[440px]">
        <CardHeader>
          <CardTitle>Chatbot</CardTitle>
          <CardDescription>Created for FullStack test</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full pr-4 mt-2">
            {
            messages.map((message) => (message.role === 'assistant'
              ? renderBotMessage(message)
              : <UserMessage key={message.id} message={message} />))
          }
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="w-full flex gap-2">
            <Input
              placeholder="How can I help you?"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
}
