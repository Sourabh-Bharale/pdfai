import { ThemeToggle } from '@/components/ThemeToggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { Darker_Grotesque } from 'next/font/google'
import { cn } from '@/lib/utils'
import { UserButton, auth } from '@clerk/nextjs'
import Balancer from 'react-wrap-balancer'
import Link from 'next/link'
import { ArrowRightIcon, LogInIcon } from 'lucide-react'
import FileUpload from '@/components/FileUpload'
import { checkSubscription } from '@/lib/subscription'
import SubscriptionButton from '@/components/SubscriptionButton'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
})
export default async function Home() {

  const { userId } = await auth()
  const isAuth = !!userId
  const isProMember = await checkSubscription()
  let firstChat ;
  if(userId){
    firstChat = await db.select().from(chats).where(eq(chats.userId,userId))
    if(firstChat){
      firstChat = firstChat[0]
    }
  }

  return (
    <div className='w-screen min-h-screen'>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center gap-2 backdrop-blur-xl rounded-2xl border-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className={cn(darkerGrotesque.className, 'text-6xl font-bold')}>PDFAI</h1>
            <UserButton afterSignOutUrl='/' />
            <ThemeToggle />
          </div>
          <div className="flex mt-2">
            {isAuth && firstChat && (<>
              <Link href={`/chat/${firstChat.id}`} className={buttonVariants()}>Go to Chats<ArrowRightIcon className='w-4 h-4'/></Link>
              <div className="ml-3">
                <SubscriptionButton isProMember={isProMember} />
              </div>
            </>
            )
            }
          </div>
          <Balancer className='max-w-xl text-lg'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. ipsum dolor sit amet consectetur, adipisicing elit.
          </Balancer>
          <div className="w-full">
            {
              isAuth ? (<FileUpload />) :
                (
                  <Link href={'/sign-in'} className={cn(buttonVariants(), 'gap-2 items-center')}>
                    Login to Continue
                    <LogInIcon className='w-4 h-4' />
                  </Link>
                )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
