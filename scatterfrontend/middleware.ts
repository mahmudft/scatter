import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
  const protected_urls = ['product', '/activate']
  if (protected_urls.some(el => request.url.includes(el))) {
    try {
      const token = request.cookies.get('token')?.value
      // console.log('catching')
      const reponse = await fetch('http://localhost:8000/profile/', {
        method: "GET",
        headers: {
          "Authorization": `Token ${token}`
        }
      })
      let dt = await reponse.json()
      console.log(dt)

      if (!reponse.ok) {
        return Response.redirect(new URL('/login', request.url))
      }

    } catch (error) {
      return Response.redirect(new URL('/login', request.url))
    }
  }
  // console.log("Middleware")
  // if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return Response.redirect(new URL('/dashboard', request.url))
  // }

  // if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
  //   return Response.redirect(new URL('/login', request.url))
  // }
}
