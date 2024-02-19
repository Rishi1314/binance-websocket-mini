import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const BinanceStream = () => {
  const [temp,settemp]=useState("Binance")
  
   // Empty dependency array ensures this effect runs only once

  return <div>{temp}</div>; // Placeholder UI
};

export default BinanceStream;
