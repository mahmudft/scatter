import Image from "next/image";
import styles from "./page.module.scss";
import { Product } from "@/utils/interfaces/product";
import { GetServerSideProps, InferGetServerSidePropsType } from "next/types";
import { url } from "inspector";

async function getData() {
  const res = await fetch('http://localhost:8000/products/')
  const products: Array<Product> = await res.json()
  return products
}

export default async function Page() {
  const data: Array<Product> = await getData()
  console.log(data)
  return (
    <section className="section-products">
    
        <div className="row">
          {data.map(product => (
            <div key={product.id} className={styles.card}>
              <img className={styles.cardtitle} title={product.title} src={product.image} />
              <div className={styles.cardbody}>
                <p>{product.title}</p>
                <p>{product.price}</p>
              </div>
              <button className="btn btn-sm d-box">More</button>
            </div>
          ))}
        </div>
    </section>
  );
}
