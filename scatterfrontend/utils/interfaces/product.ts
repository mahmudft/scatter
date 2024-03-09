export interface Product {
    id: number,
    image: string,
    visiable: boolean,
    title: string,
    contact: string,
    description: string,
    price: number,
    created_at: string,
    updated_at: string,
    comments: Array<Comment>
}


export interface Comment{
    id: number,
    text: string,
    created_at: string,
    updated_at: string,
    owner: number,
    product: number
}