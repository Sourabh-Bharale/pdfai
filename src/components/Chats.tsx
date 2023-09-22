'use client'

import { SendIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {useChat} from 'ai/react'
import Messages from "./Messages"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Message } from "ai"
type Props = {
    chatId:number
}

function Chats({chatId}: Props) {
    const {data:initialChats} = useQuery({
        queryKey:['chat',chatId],
        queryFn: async () =>{

            const response = await axios.post<Message[]>('/api/messages/',{chatId})
            return response.data
        }
    })

    const {input,handleInputChange,handleSubmit,messages} = useChat({
        api:'/api/chat',
        body:{
            chatId,
        },
        initialMessages:initialChats||[]
    })
    useEffect(()=>{
        const messageContainer = document.getElementById('message-container')
        if(messageContainer){
            messageContainer.scrollTo({
                top:messageContainer.scrollHeight,
                behavior:'smooth'
            })
        }
    },[messages])
  return (
    <div className="z-10 w-full h-full bg-background flex flex-col overflow-scroll scrollbar-thin scrollbar-thumb-current scrollbar-thumb-rounded-sm rounded-t-xl" id='message-container'>
        <div className="p-2">
            <h1 className="text-xl font-bold">Chat</h1>
        </div>

        <Messages messages={messages}/>

        <form onSubmit={handleSubmit} className=" px-2 py-4 ">
            <div className="flex w-full gap-2">
            <Input value={input} onChange={handleInputChange} placeholder="Ask..." className="w-full" />
            <Button variant={'secondary'} className="gap-2 flex items-center">
                <SendIcon className="w-4 h-4" />Send
            </Button>
            </div>
        </form>
    </div>
  )
}

export default Chats