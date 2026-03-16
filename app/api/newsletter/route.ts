import { NextResponse } from 'next/server'
import { subscribeEmail, MailchimpError } from '@/lib/mailchimp'

// In-memory rate limiting map (IP -> { count, resetTime })
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const MAX_REQUESTS = 3
const WINDOW_MS = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    return true
  }

  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    return true
  }

  if (record.count >= MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

export async function POST(req: Request) {
  try {
    // Basic IP extraction for Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { message: 'Muitas tentativas. Aguarde um momento.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: 'E-mail inválido.' },
        { status: 400 }
      )
    }

    // Call Mailchimp Integration
    await subscribeEmail(email)

    return NextResponse.json(
      { message: 'E-mail cadastrado com sucesso.' },
      { status: 200 }
    )
  } catch (error: any) {
    // Log unexpected errors internally, do not leak details to client
    console.error('[Newsletter API Error]:', error)

    if (error instanceof MailchimpError) {
      if (error.status === 400 && error.message.includes('already a list member')) {
        // Handle gracefully, even though PUT should update it.
        return NextResponse.json(
          { message: 'Você já está na lista! 🎉' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { message: 'Falha ao assinar newsletter. Verifique seu e-mail.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Algo deu errado. Tente novamente em alguns minutos.' },
      { status: 500 }
    )
  }
}
