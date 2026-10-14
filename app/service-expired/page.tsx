import Link from 'next/link'

export const metadata = {
  title: 'Website service temporarily unavailable',
  robots: { index: false, follow: false },
}

export default function ServiceExpiredPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7fb] px-6 text-[#0b2545]">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-semibold">Website service is temporarily unavailable</h1>
        <p className="mt-4 text-[#40536c]">For assistance, email info@luoqigauging.com.</p>
        <Link className="mt-6 inline-block font-medium text-[#0077b6] underline" href="/admin/login">
          Administrator login
        </Link>
      </div>
    </main>
  )
}
