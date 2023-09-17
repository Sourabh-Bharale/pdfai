import { FileValidator } from "@/lib/validators/file"
import { NextResponse } from "next/server"

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    const {fileKey,fileName} = FileValidator.parse(body)
    console.log('filekey->',fileKey,'filename->',fileName)
    return  NextResponse.json({message:'success'})
  } catch (error) {
    console.log(error)
    return NextResponse.json(
        {error: 'internal server error'},
        {status:500}
    )
  }
}