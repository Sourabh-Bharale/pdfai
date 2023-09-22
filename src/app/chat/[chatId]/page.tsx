
import ChatSidebar from "@/components/ChatSidebar"
import Chats from "@/components/Chats"
import PDFViewer from "@/components/PDFViewer"
import { db } from "@/lib/db"
import { chats } from "@/lib/db/schema"
import { checkSubscription } from "@/lib/subscription"
import { auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

type Props = {
    params:{
        chatId:string
    }
}

async function page({params:{chatId}}: Props) {
    const {userId} = await auth()
    const isProMember = await checkSubscription()
    if(!userId) return redirect('/sign-in')

    const _chats = await db.select().from(chats).where(eq(chats.userId,userId))
    if(!_chats) return redirect('/')

    if(!_chats.find(chat => chat.id === parseInt(chatId))) return redirect('/')

    const currentChat = _chats.find(chat => chat.id === parseInt(chatId))

  return (
    <div className="flex max-h-screen overflow-scroll">
        <div className="flex w-full max-h-screen overflow-scroll">
            <div className="flex-[1] max-w-xs p-2">
                <ChatSidebar isProMember={isProMember} chatId={parseInt(chatId)} chats={_chats}/>
            </div>
            <div className="max-h-screen p-2 overscroll-auto flex-[5]">
                <PDFViewer pdfUrl={currentChat?.pdfUrl||''}/>
            </div>
            <div className="flex-[3] border-l-4">
                <Chats chatId={parseInt(chatId)}/>
            </div>
        </div>
    </div>
  )
}

export default page