import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/layouts/navbar';
import { Providers } from './provider';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'Git Explorer',
    description: 'Explore GitHub profiles, repositories and trends',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn('h-full antialiased font-sans', geist.variable)}
        >
            <body className="min-h-full flex flex-col bg-background text-foreground">
                <Providers>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                </Providers>
            </body>
        </html>
    );
}
