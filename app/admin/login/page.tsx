export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reason?: string; error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="min-h-screen bg-[#f3f6fa] px-4 py-16 text-[#081f42]">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-[#cbd5e1] bg-white p-8 shadow-[0_24px_70px_rgba(8,31,66,.12)]">
        <div className="mb-7 text-center">
          <p className="text-sm font-bold tracking-[.16em] text-[#0d7f9f]">LUOQI GAUGING</p>
          <h1 className="mt-3 text-3xl font-black">网站管理后台</h1>
          <p className="mt-2 text-sm text-[#66706b]">维护产品、图片、文章和网站资料</p>
        </div>
        {params.reason === "unauthorized" ? (
          <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">请先登录后再访问管理后台。</p>
        ) : null}
        {params.error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{params.error}</p>
        ) : null}
        <form action="/api/auth/login" method="post" className="space-y-5">
          <label className="block text-sm font-bold">
            邮箱
            <input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#092756] focus:ring-2 focus:ring-[#d9e5f5]" />
          </label>
          <label className="block text-sm font-bold">
            密码
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#092756] focus:ring-2 focus:ring-[#d9e5f5]" />
          </label>
          <button type="submit" className="w-full rounded-lg bg-[#092756] px-4 py-3 font-black text-white transition hover:bg-[#061b3d] focus:outline-none focus:ring-2 focus:ring-[#092756] focus:ring-offset-2">登录后台</button>
        </form>
      </section>
    </main>
  );
}
