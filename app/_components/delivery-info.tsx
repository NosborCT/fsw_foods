import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "../_helpers/price";
import { Card } from "./ui/card";
import { Restaurant } from "@prisma/client";


interface DeliveryInfoProps{
    restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({restaurant}: DeliveryInfoProps) => {
    return ( 

               
        <div>        
        <Card className="flex justify-around py-3 mt-6 ">
            {/* Custo */}
            <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={14}/>
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">{formatCurrency(Number(restaurant.deliveryFee))}</p>
        ) : (
          <p>Grátis</p>
        )}
        </div>

        {/* tempo */}

        <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <TimerIcon size={14}/>
        </div>
        {restaurant.deliveryTimeMinutes > 0 ? (
          <p className="text-xs font-semibold">{restaurant.deliveryTimeMinutes} min</p>
        ) : (
          <p >Retirar no local </p>
        )}
        </div>

        </Card>
        </div>


     );
}
 
export default DeliveryInfo;