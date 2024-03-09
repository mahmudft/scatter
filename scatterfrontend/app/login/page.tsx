'use client'
import Toastify from 'toastify-js'
import Link from "next/link";
import {FormEvent, useState} from 'react'
import { useRouter } from 'next/navigation'

import { useCookies } from 'next-client-cookies';



export default function Login() {
    const router = useRouter()
    const cookies = useCookies();
    const handleLogin = async (event: FormEvent) => {
        event.preventDefault()
        const form = new FormData(event.target as any)
        const data = await fetch('http://localhost:8000/login/', {
            method: "POST",
            body: form
        })
        const end = await data.json()
        if(data.ok){
            console.log(end)
            Toastify({
                text: "Successfully signed into an account",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();     
              cookies.set('token', end.token)
              router.push('/')
        }else{
            Toastify({
                text: "Failed to sign into an acount",
                className: "error",
                style: {
                  background: "red",
                  color: "white"
                }
              }).showToast();
        }
    }

    return (
        <div className="flex h-screen min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Log in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                    <form className="space-y-6" onSubmit={handleLogin} method="POST">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
           Have not an account?
           {'  '}
           <Link href={'/signup'}>Sign Up</Link>
          </p>
            </div>
        </div>
    )
}