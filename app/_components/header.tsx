"use client";
import Image  from 'next/image';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Header = () => {

    const router = useRouter();
    const handleBackClick = () => router.back()
    
    return ( 
        <div className='flex justify-between pt-6 px-5'>


        <Image src = "/logo.png" alt = "FSW Foods" height = {60} width={100} onClick={handleBackClick}/>

        <Button size = 'icon' variant={'outline'} className='border-none bg-transparent'>
            <MenuIcon/>
        </Button>
        
        </div>
     );
}
 
export default Header;