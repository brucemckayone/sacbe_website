import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
 
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.pathname.split('/').pop()
  revalidateTag(tag!)
  return NextResponse.json({ revalidatedTag: tag, now: Date.now() })
}
