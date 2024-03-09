import Image from "next/image";
import styles from "./page.module.scss";
import { Product } from "@/utils/interfaces/product";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { url } from "inspector";
import Link from "next/link";

async function getData(id: number) {
  const res = await fetch(`http://localhost:8000/products/${id}`)
  const products: Product = await res.json()
  return products
}

export default async function Page({ params }: { params: { id: number } }) {
  const data: Product = await getData(params.id)
  console.log(data)
  return (

  );
}
