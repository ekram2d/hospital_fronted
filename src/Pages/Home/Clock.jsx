import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options).toUpperCase();
  };

  const formatTime = (time) => {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return time.toLocaleTimeString([], options).toUpperCase();
  };

  return (
    <div className='w-full mx-auto flex gap-4 text-xs text-zinc-400'>
      <div className="py-1 px-2 bg-gradient-to-r from-slate-600 to-slate-700  rounded-lg">{formatTime(currentTime)}</div>
      <div className="py-1 px-2 bg-gradient-to-r from-slate-600 to-slate-700  rounded-lg">{formatDate(currentTime)}</div>
    </div>
  );
};

export default Clock;
