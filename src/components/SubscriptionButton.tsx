'use client'
import { useState } from "react"
import { Button } from "./ui/button"
import axios from "axios"
import { CrownIcon, Settings2Icon } from "lucide-react"
type Props = {
    isProMember:boolean
}

const SubscriptionButton = ({isProMember}: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubscription = async ()=>{
        try {
            setLoading(true);
            const response = await axios.get('/api/stripe')
            window.location.href = response.data.url
        } catch (error) {
            console.log('error:',error)
        } finally {
            setLoading(false)
        }
    }
    return (
    <Button isLoading={loading} disabled={loading} onClick={handleSubscription}>
        {isProMember?(<>
            <h1>Manage Subscription</h1>
            <Settings2Icon className="w-4 h-4"/>
        </>):(
            <>
            <h1>Upgrade To Pro</h1>
            <CrownIcon className="w-4 h-4 fill-amber-400 "/>
            </>
        )}
    </Button>
  )
}

export default SubscriptionButton