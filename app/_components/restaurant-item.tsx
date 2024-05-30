import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface RestaurantItemProps{
    restaurant:Restaurant;
    className: string;
}
const RestaurantItem = ({restaurant,className} : RestaurantItemProps) => {
    return (
        
        <Link className={cn("min-w-[266px] max-w-[266px]", className)} href={`/restaurant/${restaurant.id}`}>
            <div className="space-y-3 w-full">

            <div className="relative h-[136px] w-full">
            <Image src={restaurant.imageUrl} fill className="object-cover rounded-lg" alt={restaurant.name}/> 
            <div className=" absolute top-2 left-2 gap-[2px] bg-white px-2 py-[2px] text-black rounded-full font-semibold text-xs flex items-center">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-500"/>
            <span>5.0</span>
            </div>

            <Button  size="icon"  className="absolute top-2 right-2 rounded-full h-7 w-7 bg-gray-700">
            <HeartIcon size={16}  className="fill-white"/>
            </Button>

            </div>
            <div>
            <h3 className="font-semibold text-sm">{restaurant.name}</h3>
            <div className="flex gap-3">
            <div className="flex gap-1 items-center" >
            <BikeIcon className="text-primary" size={14}/>
            <span className="text-xs text-muted-foreground ">{Number(restaurant.deliveryFee) == 0 ? "Entrega Gratis" : formatCurrency(Number(restaurant.deliveryFee))}</span>
            </div>
            <div className="flex gap-1 items-center" >
            <TimerIcon className="text-primary" size={14}/>
            <span className="text-xs text-muted-foreground ">{restaurant.deliveryTimeMinutes} min</span>
            </div>
            </div>
            </div>
            </div>
        </Link>
    );
}
 


export default RestaurantItem;