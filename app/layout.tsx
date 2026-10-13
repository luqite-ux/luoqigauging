import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { site } from '@/lib/site'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} | Pneumatic Gauges and Inspection Fixtures from Wuxi`,
    template: `%s | ${site.brand}`,
  },
  description:
    'Pneumatic gauges, measuring heads, setting rings, standard components and custom inspection fixtures made in Wuxi, China. Send a drawing to request a quote.',
  applicationName: site.brand,
  openGraph: {
    type: 'website',
    siteName: site.brand,
    title: `${site.brand} | Pneumatic Gauging and Inspection Fixtures`,
    description:
      'Pneumatic gauges, measuring heads, calibration standards and custom inspection fixtures from Wuxi Luoqi Measuring Instruments Co., Ltd.',
    url: site.url,
    locale: 'en',
    images: [{ url: '/images/banners/banner-pneumatic-systems.jpg', width: 3840, height: 1600 }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#0b2545',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':`${site.url}/#organization`,name:site.legalNameEn,url:site.url,logo:`${site.url}/icon.svg`,email:site.email,telephone:site.phoneDisplay,address:{'@type':'PostalAddress',addressLocality:'Wuxi',addressRegion:'Jiangsu',addressCountry:'CN'}},{'@type':'WebSite','@id':`${site.url}/#website`,url:site.url,name:site.brand,publisher:{'@id':`${site.url}/#organization`},inLanguage:'en'}]})}} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-navy focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <div id="main" className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  )
}
