import { createClient } from '@supabase/supabase-js'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'

export async function POST(request: Request) {
  const form = await request.formData()
  const value = (key: string) => String(form.get(key) ?? '').trim()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() ?? ''
  const secret = process.env.CAPTCHA_SECRET?.trim() ?? ''
  try {
    const context = createSupabaseCaptchaContextFromEnv()
    const captcha = await verifyCaptchaSubmission({ secret, ...context, scope:value('captchaScope'), token:value('captchaToken'), answer:value('captchaAnswer') })
    if (!captcha.ok) return Response.json({ ok:false, error:'The verification code is invalid or expired.' }, { status:400 })
    const email=value('email'), name=value('name'), message=value('message')
    if(!name||!email||!message) return Response.json({ok:false,error:'Please complete the required fields.'},{status:400})
    const url=process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(), key=process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
    if(!url||!key||!tenantId) throw new Error('server configuration unavailable')
    const db=createClient(url,key,{auth:{persistSession:false}})
    const {error}=await db.from('inquiries').insert({tenant_id:tenantId,name,email,company:value('company'),phone:value('phone'),subject:'Website inquiry',message})
    if(error) throw error
    return Response.json({ok:true})
  } catch {
    return Response.json({ok:false,error:'We could not submit your inquiry. Please try again.'},{status:500})
  }
}
