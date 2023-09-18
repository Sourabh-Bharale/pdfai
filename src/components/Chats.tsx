'use client'

import { SendIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import {useChat} from 'ai/react'
import Messages from "./Messages"
type Props = {}

function Chats({}: Props) {
    const {input,handleInputChange,handleSubmit,messages} = useChat({
        api:'/api/chat'
    })
  return (
    <div className="relative max-h-screen overflow-scroll">
        <div className="sticky top-0 inset-x-0 p-2 h-fit">
            <h1 className="text-xl font-bold">Chat</h1>
        </div>

        <Messages messages={messages}/>

        <form onSubmit={handleSubmit} className="sticky bottom-0 inset-x-0 px-2 py-4 ">
            <div className="flex">
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