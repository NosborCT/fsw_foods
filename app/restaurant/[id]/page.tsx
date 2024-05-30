import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";

interface RestaurantPagesProps{

    params: { 
        id: string;
    }
}


const RestaurantPage = async ({params:{id}} : RestaurantPagesProps) => {
    
    const restaurant = await db.restaurant.findUnique({
        where : { 
            id,
        },
        include: {
            categories:{
                orderBy:{ 
                    createdAt: 'desc',
                },
                include:{
                    products:{
                        include:{
                            restaurant:{
                                select:{
                                    name: true,
                                }
                            }
                        }
                    }
                },
            },
            products:{
                take: 10,
                where: {
                    restaurantId: id,

                },
                include:{
                    restaurant:{
                        select:{
                            name: true,
                        }
                    }
                }
            }
        }
    });
    if (!restaurant) {

        return notFound();
    }
    return (  

        <div>
            {/* Imagem Restaurante */}
            <RestaurantImage restaurant={restaurant}/>

            {/* Titulo */}
            <div className="flex items-center justify-between px-5 pt-5 relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
                <div className="flex items-center gap-[0.375rem]">
                    <div className="relative w-8 h-8">
                        <Image 
                        src={restaurant.imageUrl} 
                        alt={restaurant.name} 
                        fill
                        className="rounded-full object-cover"/>
                    </div>
                    <h1 className=" text-xl font-semibold">{restaurant.name}</h1>
                </div>
                <div className=" flex items-center gap-[3px] font-semibold rounded-full bg-foreground text-white px-2 py-[2px]">
                    <StarIcon size={12} className="fill-yellow-400 text-yellow-500"/>
                    <span>5.0</span>
                </div>
            </div>
            <div className="px-5">
                <DeliveryInfo restaurant={restaurant}/>
            </div>

            
            
            {/* TODO mostrar produtos mais pedidos quando implementar realização de pedido */}
            <div className=" mt-6 space-x-4">
                <h2 className=" font-semibold px-5">Mais pedidos</h2>
                <ProductList products={restaurant.products} /> 
            </div>

            {restaurant.categories.map((category) => (

            <div className=" mt-6 space-x-4" key={category.id}>
                <h2 className=" font-semibold px-5">{category.name}</h2>
                <ProductList products={category.products} />     
            </div>


            ))}

        </div>

    );
}
 
export default RestaurantPage;