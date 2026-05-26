import createMiddleware from 'next-intl/middleware'
import {clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server'
import {routing} from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const isProtectedRoute = createRouteMatcher([
  '/app(.*)',
  '/:locale/app(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const intlResponse = intlMiddleware(req)

  if (isProtectedRoute(req)) {
    await auth.protect()
  }

  return intlResponse
})

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
}