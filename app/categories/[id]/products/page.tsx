import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";


interface CategoriesPageProps{

    params:{
        id: string;
    }

}

const CategoriesPage = async({params:{id}}:CategoriesPageProps) => {
    const category = await db.category.findUnique({
        where:{
            id
        },
        include:{
            products:{
                include:{
                    restaurant: {
                        select:{
                            name:true
                        }
                    }
                }
            }
        }
    })

    if(!category){
        return notFound()
    }

    return (
        <>
        <div>
            <Header/>
            <div className='py-6 px-5'>
            
                <h2 className='text-lg font-semibold mb-6'>{category.name}</h2>
                <div className='grid grid-cols-2 gap-6'>
                {category?.products.map((product)=> (
                    <ProductItem key={product.id} product={product} className={" min-w-full"}/> 
                ))}
                </div>

            </div>

        
        </div>
        </>
    
        )
    ;
}
 
export default CategoriesPage ;