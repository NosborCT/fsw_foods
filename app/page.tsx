import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const Home = async() => {
  const products = await db.product.findMany({
    where :{
        discountPercentage:{
            gt: 0,
        },
    },
    take:10,
    include:{
        restaurant: {select: {name:true,} }
    }
});
  return ( 
    <>
    <Header/>
    <div className="px-5 py-6" >
      <Search/>
    </div>
    <div className="px-5 pt-6"><CategoryList/></div>
    <div className="px-5 pt-6">
      <PromoBanner 
      src="/promo-banner-01.png" 
      alt="Até 30% de desconto em pizzas!"
      />
    </div>
    <div className="pt-6 space-y-4">
      <div className="px5 flex items-center justify-between" >
      <h2 className="font-semibold pl-6 ">Produtos Recomendados</h2>
      <Button variant={"ghost"} className="text-primary p-0 hover:bg-transparent h-fit" asChild>
        <Link href='/products/recommended/'>     
          Ver todos
        <ChevronRightIcon size={16}/></Link>
      </Button>
      </div>
      <ProductList products={products}/>
    </div>
    <div className="px-5 pt-6">
      <PromoBanner 
      src="/promo-banner-02.png" 
      alt="A partir de 17 reais em lanches"
      />
    </div>
    <div className="pt-6 space-y-4 py-6">
      <div className="px5 flex items-center justify-between" >
      <h2 className="font-semibold pl-6 ">Restaurantes Recomendados</h2>
          <Button variant={"ghost"} className="text-primary p-0 hover:bg-transparent h-fit" asChild >
          <Link href="/restaurant/recommended">
            Ver todos
            <ChevronRightIcon size={16}/>
          </Link>    
        </Button>
      </div>  
      <RestaurantList/>
    </div>

    </>

   );
}
export default Home;
