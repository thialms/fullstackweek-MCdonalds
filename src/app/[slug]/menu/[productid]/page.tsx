
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ProductHeader from "./components/Product-header";

interface ProductPageProps {
    params: Promise<{ slug: string; productid: string }>;
}

const ProductPage  = async ({params}: ProductPageProps) => {
    const { slug, productid } = await params;
    const product = await db.product.findUnique({ where : { id: productid } });
    if (!product) {
        return notFound();
    }
    
    return ( 
        <ProductHeader product={product} />
    );
}
 
export default ProductPage ;