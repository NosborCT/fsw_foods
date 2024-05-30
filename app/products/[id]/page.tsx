import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import { Button } from "@/app/_components/ui/button";


interface ProductPageProps{
    params:{
        id: string;
    };
}

const ProductPage = async ({params:{id}}:ProductPageProps) => {

    const product = await db.product.findUnique({
        where: {
          id,
        },
        include: {
          restaurant: true,
        },
      });
      const juices = await db.product.findMany({
        where: {
          category: {
            name: "Sucos",
          },
          restaurant: {
            id: product?.restaurant.id,
          },
        },
        include: {
          restaurant: true,
        },
      });
      if (!product) {
        return notFound();
      }
    return ( 
    
    <div>

        {/* imagem */}
        <ProductImage product={product}/>
        {/* Titulo e Preço do produto */}
       <ProductDetails product={product} complementaryProducts={[]}/>

      <div className="px5">
        <Button className="w-full mt-3">Adicionar a sacola</Button>
      </div>



    </div>

      

    );  
    
}
 

export default ProductPage;