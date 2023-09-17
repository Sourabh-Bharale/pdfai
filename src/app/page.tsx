import { ThemeToggle } from '@/components/ThemeToggle'
import { Button, buttonVariants } from '@/components/ui/button'
import {Darker_Grotesque} from 'next/font/google'
import { cn } from '@/lib/utils'
import { UserButton, auth } from '@clerk/nextjs'
import Balancer from 'react-wrap-balancer'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
})
export default async function Home() {

  const {userId} = await auth()
  const isAuth = !!userId

  return (
    <div className='w-screen min-h-screen'>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center  gap-2">
          <div className="flex items-center justify-center">
            <h1 className={cn(darkerGrotesque.className,'text-6xl font-bold')}>PDFAI</h1>
            <UserButton afterSignOutUrl='/'/>
          </div>
          {isAuth&&<div className="flex mt-2">
            <Button>Go to Chats</Button>
          </div>}
          <Balancer className='max-w-xl text-lg'>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. ipsum dolor sit amet consectetur, adipisicing elit.</p>
          </Balancer>
          <div className="w-full">
            {
              isAuth?(<h1>fileupload</h1>):
              (
                <Link href={'/sign-in'} className={cn(buttonVariants(),'gap-2 items-center')}>
                  Login to Continue
                <LogInIcon className='w-4 h-4'/>
                </Link>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
