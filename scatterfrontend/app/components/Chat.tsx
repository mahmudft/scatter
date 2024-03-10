'use client'
import React, { useState,useReducer, useEffect, useRef } from 'react';
import { useCookies } from 'next-client-cookies';

import { Comment } from "@/utils/interfaces/product";

const reducer = (state: Array<Comment>, action: {type: string, payload: Comment}) => {
    switch (action.type) {
      case "Add":
        return [...state, action.payload]
      default:
        return state;
    }
  };



export default function Chat({props}: {props: {id: number, comments:Array<Comment>}}) {
    const cookies = useCookies();
    const [comments, dispatch] = useReducer(reducer, (props.comments || []))
    const chatRef = useRef(null)
    const socket = new WebSocket(`ws://localhost:8000/ws/${props.id}?token=${cookies.get('token')}`)

    useEffect(() => {
        if (socket) {
            socket.onmessage = function (e) {
                const box = JSON.parse(e.data);
                dispatch({ type: "Add", payload: box['message'] });
                console.log(box['message']);
            };
        }
        return () => {
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        };
    }, [socket]);

    const sendMessage = () => {
        socket.send(JSON.stringify({message: chatRef.current.value}));
        chatRef.current.value = ''
        // socket.onopen  = function() {
        //     socket.send(JSON.stringify({type: 'chat.message', message: 'Hello'}));
        // }
        // socket.emit('chat.message', chatRef.current.value);
        // chatRef.current.value = ''
    };

    return (
        <div className='flex flex-col w-full bg-white rounded-xl border-2 p-3 border-sky-300 gap-3'>
            <h1>Real-Time Chat</h1>
            <div className="w-4/6 flex flex-row gap-4 shrink-0">
                <div className="relative w-full min-w-[200px]">
                    <textarea
                    disabled={!Boolean(cookies.get('token'))}
                    ref={chatRef}
                        className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" "></textarea>
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Message
                    </label>
                </div>
                <button className='bg-green-500 rounded-xl h-9  py-1 px-4 text-white' onClick={sendMessage}>Send</button>
            </div>
            <ul className=''>
                {comments?.map((el: Comment) => (
                    <li key={el.id}>{el.text}</li>
                ))}
            </ul>
        </div>
    );
}