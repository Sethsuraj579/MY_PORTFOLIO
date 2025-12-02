import type React from "react"
import Home from "./App.tsx"
import './styles/global.css'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Home />
      </body>
    </html>
  )
}
