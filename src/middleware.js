import { validateRequest } from 'helpers/validator'

export async function middleware(req, res) {
  return validateRequest(req)
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}
