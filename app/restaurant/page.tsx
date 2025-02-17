"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./_actions/search";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant-item";

const Restaurants = () => {
    const searchParams = useSearchParams();
    const [restaurants,setRestaurants] = useState <Restaurant[]>([]);
    const searchFor = searchParams.get("search");

    useEffect(()=> {
        const fetchRestaurants = async ()=> {
            if (!searchFor) return;
            const foundRestaurants = await searchForRestaurants(searchFor);
            setRestaurants(foundRestaurants)
        };
        fetchRestaurants();
    }, [searchFor]);
    if (!searchFor){
        return notFound;
    }
    
    return ( 

        <>
        <div>
            <Header/>
            <div className='py-6 px-5'>
            
                <h2 className='text-lg font-semibold mb-6'>Restaurantes Encontrados</h2>
                <div className='grid grid-cols-2 gap-6'>
                {restaurants.map((restaurant)=> (
                    <RestaurantItem key={restaurant.id} restaurant={restaurant} className="min-w-full max-w-full"/>
                ))}
                </div>
            </div>
        </div>
        </>


     );
}
 
export default Restaurants;