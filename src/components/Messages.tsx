import { cn } from "@/lib/utils"
import { Message } from "ai/react"
import { Loader2 } from "lucide-react";

type Props = {
    messages:Message[]
}

function Messages({messages}: Props) {

    if(!messages) return <></>
    return (
        <div className="flex flex-col gap-2 px-4">
        {messages.map((message) => {
          return (
            <div
              key={message.id}
              className={cn("flex", {
                "justify-end pl-10": message.role === "user",
                "justify-start pr-10": message.role === "assistant",
              })}
            >
              <div
                className={cn(
                  "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ",
                  {
                    "bg-blue-300 text-background font-semibold": message.role === "user",
                    "bg-green-300 text-background font-semibold": message.role === "assistant",
                  }
                )}
              >
                <p>{message.content}</p>
              </div>
            </div>
          );
        })}
      </div>
  )
}

export default Messages