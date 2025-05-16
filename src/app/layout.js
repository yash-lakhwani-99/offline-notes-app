import './globals.css'

export const metadata = {
  title: 'Offline Notes',
  description: 'Offline first notes app with sync',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
