
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpdate } from '../redux/user/userSlice';



export default function Component() {
    const { currentSymbol, price, reload } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const clientRef = useRef(null);
    const priceRef = useRef(null);
    const [waitingToReconnect, setWaitingToReconnect] = useState(null);
    const [messages, setMessages] = useState(null);
    const [rice, setrice] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    function addMessage(message) {


        setMessages(JSON.parse(message));
    }
    const URL = `wss://stream.binance.com:9443/ws/${currentSymbol}@trade`;
    useEffect(() => {
        
        if (waitingToReconnect) {
            return;
        }
        
        // Only set up the websocket once
        if (!clientRef.current) {
            const client = new WebSocket(URL);
            clientRef.current = client;

            window.client = client;

            client.onerror = (e) => console.error(e);

            client.onopen = () => {
                setIsOpen(true);
                console.log('ws opened');
            };

            client.onclose = () => {

                if (clientRef.current) {
                    // Connection failed
                    console.log('ws closed by server');
                } else {
                    // Cleanup initiated from app side, can return here, to not attempt a reconnect
                    console.log('ws closed by app component unmount');
                    return;
                }

                if (waitingToReconnect) {
                    return;
                }

                // Parse event code and log
                setIsOpen(false);
                console.log('ws closed');

                // Setting this will trigger a re-run of the effect,
                // cleaning up the current websocket, but not setting
                // up a new one right away
                setWaitingToReconnect(true);

                // This will trigger another re-run, and because it is false,
                // the socket will be set up again
                setTimeout(() => setWaitingToReconnect(null), 5000);
            };
            if (price) {
                client.onmessage = message => {

                    addMessage(message.data);
                };
            } else {
                client.onmessage = message => {
                    addMessage(message.data);
                    dispatch(signUpdate(JSON.parse(message.data).p))
                };
            }



            return () => {

                console.log('Cleanup');
                // Dereference, so it will set up next time
                clientRef.current = null;

                client.close();
            }
        }

    }, [currentSymbol,price]);

    useEffect(() => {
        if (priceRef.current) {

            if (messages) {
                
                if (parseFloat(messages.p) > parseFloat(price)) {
                    priceRef.current.className = "greenc"
                } else {
                    priceRef.current.className = "redc"
                }
            }
        }


    }, [messages])

   

    return (
        <div >

            {

                (messages) ?

                    <div className='webSocketCard'>
                        <div className='text'>
                            <span>{  (currentSymbol).toUpperCase() }</span>
                            <span>You opened at: { price?parseFloat(price):"Loading.." }</span>
                        </div>
                        <p className='greenc' ref={priceRef}>{parseFloat(messages.p)}</p>

                    </div>
                    : "Loading..."

            }

        </div>
    );
}