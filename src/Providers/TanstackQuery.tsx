'use client'
import { QueryClientProvider,QueryClient } from "@tanstack/react-query"

type Props = {
    children: React.ReactNode
}
const queryClient = new QueryClient()

export default function TanstackQuery({children}:Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}