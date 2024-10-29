'use client'

import { Space_Grotesk } from 'next/font/google'
import Link from 'next/link'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export default function NotFound() {
    return  (<>
        <style jsx>{`
            body {
                background-color: #0A0A0A;
                color: #E2E8F0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                padding: 0 20px;
                text-align: center;
            }
            h1 {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 4rem;
                margin-bottom: 0;
                color: #D97706;
            }
            p {
                font-size: 1.2rem;
                margin-top: 1rem;
            }
            a {
                color: #D97706;
                text-decoration: none;
                border-bottom: 1px solid #D97706;
                padding-bottom: 2px;
                transition: border-color 0.3s ease;
            }
            a:hover {
                border-color: #B45309;
            }`}
        </style>
        <section className="w-full py-6 md:py-12 lg:py-24">
            <div className="container text-center">
                <h1 className={`${spaceGrotesk.className}`}>404</h1>
                <p className={`${spaceGrotesk.className}`}>Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
                <p className={`${spaceGrotesk.className}`}>It seems you&apos;ve ventured into uncharted territory.</p>
                <p className={`${spaceGrotesk.className}`}><Link href="/">Return to the homepage</Link></p>
            </div>
        </section>
        
    </>)
}