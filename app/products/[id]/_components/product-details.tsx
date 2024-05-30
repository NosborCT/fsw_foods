"use client";

import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: true;
      };
    }>;
    complementaryProducts: Prisma.ProductGetPayload<{
      include: {
        restaurant: true;
      };
    }>[];
  }

const ProductDetails = ({product,complementaryProducts}: ProductDetailsProps) => {
   const [quantity,setQuantity] = useState(1);
   const handleIncreaseQuantityClick = () => setQuantity(currentState => currentState + 1);
   const handleDecreaseQuantityClick = () => setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });   
    return ( 

        <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        {/* Restaurante */}
        <div className="flex items-center gap-[0.375rem] px-5 py-3">
          <div className="relative h-6 w-6">
          <Image 
          src={product.restaurant.imageUrl} 
          alt={product.restaurant.name} 
          fill
          className="rounded-full object-cover"/>
          </div>
          <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
        
        </div>

        {/* nome do produto */}
        <h1 className="mb-3 mt-3 text-xl font-semibold px-5"> {product.name}</h1>
        {/* Preço do produto e quantidade */}
        <div className="flex justify-between px-5">
          {/* preço com desconto*/}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage && (
              
              <DiscountBadge product={product}/>)}
            </div>

              {/* preco original */}
              <p className=" text-muted-foreground text-sm">
               De: {formatCurrency(Number(product.price))}
              </p>

          </div>

          {/* Quantidade */}
          
          <div className="flex items-center gap-3">
            <Button 
            size="icon" 
            variant="ghost" 
            className="border border-solid border-muted-foreground"  
            onClick={handleDecreaseQuantityClick}>
                <ChevronLeftIcon/>
            </Button>
            <span className="w-4 text-center">{quantity}</span>
            <Button size="icon" onClick={handleIncreaseQuantityClick}>
                <ChevronRightIcon/>
            </Button>


          </div>




        </div>

        <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
        </div>

        {/* Sobre */}
        <div className=" mt-6 space-y-3 px-5">
            <h3 className=" font-semibold">Sobre</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        {/* Sucos */}
        <div className=" mt-6 space-y-3 px-5">
            <h3 className=" font-semibold">Sucos</h3>
            <ProductList products={complementaryProducts}/>
            
        </div>
        

      </div>



     );
}
 
export default ProductDetails;