'use client'
import { DrizzleChat } from "@/lib/db/schema"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { CrownIcon, MessageCircleIcon, PlusCircleIcon } from "lucide-react"
import { Separator } from "./ui/separator"

import SubscriptionButton from "./SubscriptionButton"

type Props = {
    chats:DrizzleChat[],
    chatId:number,
    isProMember:boolean
}

function ChatSidebar({chatId,chats,isProMember}: Props) {
    return (
    <div className="w-full p-4 bg-primary/5 rounded-xl">
        {
            chats.length<1 ? (
                <Link href={'/'} className={cn(buttonVariants({className:'w-full border-2'}),'flex w-full gap-2')}>
        <PlusCircleIcon className="w-4 h-4"/>
        New Chat
    </Link>
            ):(
            <SubscriptionButton text={'Upgrade for more Chats'} isProMember={isProMember} />
            )
        }

    <Separator className="w-full mt-2 h-1 rounded-full"/>
    <div className="flex flex-col gap-2 mt-2">
        {
            chats.map(chat=>(
                <Link key={chat.id} href={`/chat/${chat.id}`}>
                    <div className={cn('flex items-center p-2 font-semibold rounded-md gap-1',{
                        'bg-primary text-background': chatId === chat.id,
                        'hover:bg-secondary': chatId !== chat.id
                    })}>
                        <MessageCircleIcon className="w-5 h-5"/>
                        <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">{chat.pdfName}</p>
                    </div>
                </Link>
            ))
        }
    </div>
    </div>
  )
}

export default ChatSidebar