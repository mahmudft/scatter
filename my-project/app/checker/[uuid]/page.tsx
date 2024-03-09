'use client'
import { useCookies } from 'next-client-cookies';
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ActivateID({ params }: { params: { uuid: string } }){
    console.log(params.uuid);
    const cookies = useCookies();
    
    const router = useRouter()

    const activateProduct = async () => {
        const data = await fetch(`http://localhost:8000/activate_product/${params.uuid}`, {
            method: "PATCH",
            headers: {
                'Authorization': `Token ${cookies.get('token')}`
            }
        })
        if(data.ok){
            return  router.push('/')
        }
    }

    useEffect(() => {
        async function fetcher(){
           try {
            const data = await fetch(`http://localhost:8000/activate_product/${params.uuid}`, {
                headers: {
                    'Authorization': `Token ${cookies.get('token')}`
                }
            })
            if(!data.ok){
                router.push('/')
            }
           } catch (error) {
            return  router.push('/')
           }
        }
        fetcher()
    }, [])
    return(
       <button onClick={activateProduct}>Activate Product</button>
    )
}