'use client'
import { FormEvent } from "react"
import Toastify from 'toastify-js'
import { useRouter } from 'next/navigation'
import { useCookies } from 'next-client-cookies';

export default function Page() {
    const router = useRouter()
    const cookies = useCookies();
    const addproduct = async (event: FormEvent) => {
        event.preventDefault()
        const form = new FormData(event.target as any)

        const data = await fetch('http://localhost:8000/create_product/', {
            method: "POST",
            next: { revalidate: 2600 },
            body: form,
            headers: {
                "Authorization": `Token ${cookies.get('token')}`
            }
        })
        const end = await data.json()
        if(data.ok){
            console.log(end)
            Toastify({
                text: "Successfully created an product",
                className: "info",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();     
              document.cookie = `token=${end.token}; path=/`;
              router.push('/')
        }else{
            Toastify({
                text: "Failed to create an product",
                className: "error",
                style: {
                  background: "red",
                  color: "white"
                }
              }).showToast();
        }
    }

    return (
        <div className="flex h-screen min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 mt-9">
            <form onSubmit={addproduct} className="w-full bg-white p-9">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="title" id="title" type="text" />
                        <p className="text-gray-600 text-xs italic">make a shiny title</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="description" id="description" type="textarea" />
                        <p className="text-gray-600 text-xs italic">add some description about product</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="price" id="price" type="number" />
                        <p className="text-gray-600 text-xs italic">add price detailts</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="contact">
                            Contact
                        </label>
                        <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="contact" id="contact" type="text" />
                        <p className="text-gray-600 text-xs italic">add contact information</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="image">
                            Image
                        </label>
                        <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="image" id="image" type="file" />
                        <p className="text-gray-600 text-xs italic">add cover for your product</p>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}