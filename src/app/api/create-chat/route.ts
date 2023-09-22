  import deleteUTFile from "@/lib/checkLimitOnFreeTier"
import { db } from "@/lib/db"
  import { chats } from "@/lib/db/schema"
  import { loadUTIntoPinecone } from "@/lib/pinecone"
  import { checkSubscription } from "@/lib/subscription"
  import { FileValidator } from "@/lib/validators/file"
  import { auth } from "@clerk/nextjs"
  import { eq } from "drizzle-orm"
  import { NextResponse } from "next/server"
 

  export async function POST(req: Request, res: Response) {
    try {
      const {userId} = await auth()
      if(!userId)
        return NextResponse.json({error:'unauthorized'}, {status:401});

        const isProMember = await checkSubscription()
        if (!isProMember) {
          // Check if the user has already created a chat
          const existingChats = await db
            .select()
            .from(chats)
            .where(eq(chats.userId, userId))

          if (existingChats.length > 0) {
            await deleteUTFile(existingChats[0].fileKey);
            return NextResponse.json({ error: 'You are not allowed to create more than one chat as a non-Pro member' }, { status: 403 })
          }
        }

      const body = await req.json()
      const {fileKey,fileName} = FileValidator.parse(body)
      await loadUTIntoPinecone(fileKey);

      const chat_id = await db.insert(chats).values({
        fileKey,
        pdfName:fileName,
        pdfUrl:`https://utfs.io/f/${fileKey}`,
        userId,
      }).returning({
        insertedId:chats.id
      })

      return NextResponse.json({
        chat_id:chat_id[0].insertedId
      },{status:200})

    } catch (error) {
      console.log(error)
      return NextResponse.json(
          {error: 'internal server error'},
          {status:500}
      )
    }
  }