"use client";

import { Input } from "@/app/_components/ui/input";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import { useState, FormEventHandler } from "react";
import { useRouter } from 'next/navigation';

const Search = () => {

    const router = useRouter();
    const [search, setSearch] = useState("");
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    };
  
    const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
  
      if (!search) {
        return;
      }
  
      router.push(`/restaurant?search=${search}`);
    };

    return (
        <form className="flex gap-2" onSubmit={handleSearchSubmit}>
          <Input
            placeholder="Buscar restaurantes"
            className="border-none"
            onChange={handleChange}
            value={search}
          />
          <Button size="icon" type="submit">
            <SearchIcon size={20} />
          </Button>
        </form>
      );
    };
    
    export default Search;