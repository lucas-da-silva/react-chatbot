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
        <CardTitle>ChatBot</CardTitle>
        <CardDescription>Created for FullStack test</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4 mt-2">
          <div className="flex gap-2 text-[#1a0400] font-medium text-sm mb-4">
            <Avatar className="self-end h-6 w-6">
              <AvatarFallback>BOT</AvatarFallback>
              <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png" />
            </Avatar>
            <div className="bg-zinc-100 p-3 rounded-r-2xl rounded-t-2xl">
              <p className="leading-relaxed">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores, doloribus fugit? Porro explicabo ducimus distinctio, enim, laboriosam cum similique officiis debitis, modi earum aut exercitationem! Totam ullam soluta voluptatibus quos!
              </p>
            </div>
          </div>
          <div className="flex text-sm mb-4 justify-end text-[#1a0400] font-medium">
            <div className="bg-[#fae5ca] p-3 rounded-l-xl rounded-t-xl">
              <p className="leading-relaxed">
                Qual a
              </p>
            </div>
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
