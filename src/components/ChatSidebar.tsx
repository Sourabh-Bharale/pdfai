'use client'
import { DrizzleChat } from "@/lib/db/schema"
import Link from "next/link"
import { Button, buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { CrownIcon, MessageCircleIcon, PlusCircleIcon } from "lucide-react"
import { Separator } from "./ui/separator"
import { useState } from "react"
import axios from "axios"
import SubscriptionButton from "./SubscriptionButton"

type Props = {
    chats:DrizzleChat[],
    chatId:number,
    isProMember:boolean
}

function ChatSidebar({chatId,chats,isProMember}: Props) {
    return (
    <div className="w-full h-screen p-4 bg-primary/5 rounded-xl">
    <Link href={'/'} className={cn(buttonVariants({className:'w-full border-2'}),'flex w-full gap-2')}>
        <PlusCircleIcon className="w-4 h-4"/>
        New Chat
    </Link>
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

    <div className="absolute bottom-4 left-4">
        <div className="flex item-center gap-2 text-sm  flex-wrap justify-between">
            <Link className={cn(buttonVariants({variant:'ghost'}))} href='/'>Home</Link>
            {/* <Button className={'flex gap-1 items-center'} onClick={handleSubscription} disabled={loading} isLoading={loading}>
                <CrownIcon className="w-4 h-4 fill-amber-400 "/>
                Upgrade To Pro
            </Button> */}
            <SubscriptionButton isProMember={isProMember} />
        </div>
    </div>
    </div>
  )
}

export default ChatSidebar