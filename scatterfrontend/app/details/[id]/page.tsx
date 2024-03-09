import Image from "next/image";
import styles from "./page.module.scss";
import { Product } from "@/utils/interfaces/product";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { url } from "inspector";
import Link from "next/link";
import Chat from "@/app/components/Chat";

async function getData(id: number) {
  const res = await fetch(`http://localhost:8000/products/${id}`)
  const products: Partial<Product> = await res.json()
  return products
}

export default async function Page({ params }: { params: { id: number } }) {
  const data: Partial<Product> = await getData(params.id)
  // console.log(data)
  return (

    <div>
      <section
        className="divide-y divide-dashed overflow-hidden pt-20 pb-12 px-10 lg:pt-[120px] lg:pb-[90px] bg-white dark:bg-dark rounded-e-lg"
      >
        <div className="flex flex-col gap-3 container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <img
                src={data.image}
                alt=""
                className="w-full rounded-2xl"
              />
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="flex flex-col gap-2 mt-10 lg:mt-0">
                <span className="block text-dark mb-4 text-lg font-semibold text-primary">
                  {data.title}
                </span>
                <h2
                  className="font-sans text-xl font-bold text-dark dark:text-white"
                >
                  Description:
                </h2>
                <h2
                  className="font-sans text-base font-normal text-dark dark:text-white"
                >
                  {data.description}
                </h2>
                <h2
                  className="font-sans text-xl font-bold text-dark dark:text-white"
                >
                  Seller: {data.contact}
                </h2>
                <h2
                  className="font-sans text-base font-bold text-dark dark:text-white"
                >
                  ${data.price}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <Chat props={{id: params.id, comments:data.comments}}/>
      </section>
    </div>
  );
}
