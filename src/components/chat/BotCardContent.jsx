import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';

export default function BotCardContent({ children }) {
  return (
    <div className="flex gap-2 text-primary-black font-medium text-sm mb-4">
      <Avatar className="self-end h-6 w-6">
        <AvatarFallback>BOT</AvatarFallback>
        <AvatarImage src="https://cdn.iconscout.com/icon/free/png-512/free-robot-103-450485.png?f=avif&w=256" />
      </Avatar>
      <div className="bg-zinc-100 p-3 rounded-r-2xl rounded-t-2xl leading-relaxed">
        {children}
      </div>
    </div>
  );
}

BotCardContent.propTypes = {
  children: PropTypes.node.isRequired,
};
