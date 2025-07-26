import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Rede Gamer',
  description: 'Hospedagem de alta performance para seus projetos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        {children}
        <Toaster />
        <Script id="devtools-message" strategy="afterInteractive">
          {`
            const styles = [
              'font-size: 2rem',
              'color: #663399',
              'font-weight: bold',
              'text-shadow: 2px 2px 4px rgba(0,0,0,0.3)'
            ].join(';');
            const message = 'Opa! Curioso, hein? 👀';
            console.log('%c%s', styles, message);
          `}
        </Script>
      </body>
    </html>
  );
}
