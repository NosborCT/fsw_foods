"use client";
import { Prisma} from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface ProductItemProps{
    product : Prisma.ProductGetPayload<{
        include:{
            restaurant:{
                select:{
                    name:true
            }}
        }
    }>;
    className: string

}

const ProductItem = ({product,className}: ProductItemProps) => {

    return (

        <Link className={cn("w-[150px] min-w-[150px]",className)} href={`/products/${product.id}`}>
        
        <div className="space-y-2 w-full h-auto" >
           
            <div className=" aspect-square w-full relative">
                <Image src = {product.imageUrl} alt={product.name} fill className="object-cover rounded-lg shadow-md"/>
                
                {product.discountPercentage && (
                    <div className=" absolute top-2 left-2 gap-[2px] bg-primary px-2 py-[2px] text-white rounded-full font-semibold text-xs flex items-center">
                        <ArrowDownIcon size={12}/>
                        <span>{product.discountPercentage}%</span>
                    </div>

                )}
            </div>

            
            <div>
                <h2 className="text-sm truncate">{product.name}</h2>
                <div className="flex gap-4 font-semibold items-center ">
                    <h3 className="font-semibold">
                        {formatCurrency(calculateProductTotalPrice(product))}
                    </h3>
                    {product.discountPercentage > 0 && (
                        <span className="text-muted-foreground line-through text-xs">
                            {formatCurrency(Number(product.price))}
                        </span>
                    )}
                </div>
            </div>

            <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>


        </div>
        </Link>
        
    );
}
 
export default ProductItem;