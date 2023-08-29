import React from 'react';

import {
  Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription,
} from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';

export default function Chat() {
  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Chatbot</CardTitle>
        <CardDescription>Created for FullStack test</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4">
          <div className="flex gap-3 text-slate-600 text-sm mb-4">
            <Avatar>
              <AvatarFallback>USER</AvatarFallback>
              <AvatarImage src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" />
            </Avatar>
            <p className="leading-relaxed pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis vitae, temporibus, laborum perferendis fugit veniam ducimus numquam reprehenderit impedit cum eius exercitationem reiciendis earum quidem explicabo laboriosam autem vel quod?
            </p>
          </div>
          <div className="flex gap-3 text-slate-600 text-sm">
            <Avatar>
              <AvatarFallback>BOT</AvatarFallback>
              <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png" />
            </Avatar>
            <p className="leading-relaxed pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis vitae, temporibus, laborum perferendis fugit veniam ducimus numquam reprehenderit impedit cum eius exercitationem reiciendis earum quidem explicabo laboriosam autem vel quod?
            </p>
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2">
          <Input placeholder="How can I help you?" />
          <Button type="submit">Send</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
