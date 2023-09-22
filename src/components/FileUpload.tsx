'use client'
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/utils/uploadthing"
import { useToast } from "./ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios ,{ AxiosError } from "axios";
import { FileRequest } from "@/lib/validators/file";
import {useRouter} from 'next/navigation'
import { checkSubscription } from "@/lib/subscription";
type Props = {}

export default function FileUpload({}: Props) {
  const {toast}  = useToast()
  const router = useRouter()


  const {mutate,isLoading} = useMutation({
    mutationFn:async ({fileKey,fileName}:FileRequest)=>{
      const payload : FileRequest = {
        fileKey,
        fileName
      }
      const {data} = await axios.post('/api/create-chat',payload)
      return data
    },
    onError:async(err)=>{
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Username already taken.',
            description: 'Please choose another username.',
            variant: 'destructive',
          })
        }
        else if(err.response?.status===403){
          return toast({
            title: 'Upgrade to Pro to create more chats.',
            description: 'You have reached the maximum number of chats for your free account , Upgrade to Pro to create more chats.',
            variant: 'destructive',
          })
        }
        else if (err.response?.status === 422) {
          return toast({
              title: 'Invalid user name',
              description: 'A valid username is between 3 and 21 Alphanumeric characters only (special characters not allowed)',
              variant: 'destructive'
          })
      }
      }

      return toast({
        title: 'Error Initializing Chat',
        description: 'An Error Occured while Initializing your Chat Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess:({chat_id})=>{
      router.push(`/chat/${chat_id}`)
      return toast({
        title:"Chat Initialized",
        description:"Chat was initialized successfully",
      })
    }
  })



  return (
    <div className="p-2 rounded-xl">

          <UploadButton
        endpoint="fileUploader"


        onClientUploadComplete={(res) => {
          if(res)
            console.log(res[0])
          // Do something with the response
          if(res){
            const {key,name} = res[0]
            mutate({fileKey:key,fileName:name})
          }
          return toast({
            title:"File Uploaded",
            description:"File was uploaded successfully",
          })
        }}
        onUploadError={(error: Error) => {
          return toast({
            title:"Could not upload file",
            description:error.message,
            variant:"destructive"
          })
        }}
      />


    </div>
  )
}