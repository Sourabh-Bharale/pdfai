
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
    <div className="flex w-full h-[100vh] overflow-scroll scrollbar-thin scrollbar-thumb-current scrollbar-thumb-rounded-sm">
        <div className="flex md:flex-row flex-col w-full h-full overflow-scroll scrollbar-thin scrollbar-thumb-current scrollbar-thumb-rounded-sm">
            <div className=" md:max-w-2xl w-full gap-2 p-2 scrollbar-thin scrollbar-thumb-current scrollbar-thumb-rounded-sm">
                <ChatSidebar isProMember={isProMember} chatId={parseInt(chatId)} chats={_chats}/>

                <div className="flex w-full h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-current scrollbar-thumb-rounded-sm">
                <PDFViewer pdfUrl={currentChat?.pdfUrl||''}/>

                </div>

            </div>
            <div className="w-full h-full border-l-4 scrollbar-thin scrollbar-thumb-current scrollbar-thumb-rounded-sm">
                <Chats chatId={parseInt(chatId)}/>
            </div>
        </div>
    </div>
  )
}

export default page