import { ThemeProvider } from '@/components/ThemeProvider'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/toaster'
import TanstackQuery from '@/Providers/TanstackQuery'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <TanstackQuery>
    <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster/>
          </ThemeProvider>
        </body>
      </html>
      </TanstackQuery>
    </ClerkProvider>
  )
}
