import type { NextRequest } from 'next/server'


export const config = {
	matcher: [
		'/api/:path*',
	],
}

// https://nextjs.org/docs/pages/building-your-application/routing/middleware
export function middleware(request: NextRequest) {
	// todo: 中间件 验证 token 
}