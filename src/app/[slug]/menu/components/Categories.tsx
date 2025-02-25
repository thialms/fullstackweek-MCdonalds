"use client";

import { Prisma } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./Products";

interface RestaurantCategoriesProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: { menuCategories: { include: { products: true } } };
  }>;
}

type menuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
  include: { products: true };
}>;

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<menuCategoriesWithProducts>(
    restaurant.menuCategories[0],
  );

  const handleCategoryClick = (category: menuCategoriesWithProducts) => {
    setSelectedCategory(category);
    };

    const getCategoryButtonVariant = (category: menuCategoriesWithProducts) => {
      return selectedCategory.id === category.id ? "default" : "secondary"; 
  };

  const hourNow = new Date().getHours();
  const openingHour = 10;
  const closingHour = 22;
  const isOpen = hourNow >= openingHour && hourNow < closingHour;
  const messageHour = isOpen ? "Aberto!" : "Fechado!";
  const hourMessageClass = isOpen ? "text-green-500" : "text-red-500";

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl bg-white">
      <div className="p-5">
        <div className="flex items-center gap-3">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={45}
            height={45}
          />
          <div>
            <h2 className="text-lg font-semibold">{restaurant.name}</h2>
            <p className="text-xs opacity-55">{restaurant.description}</p>
          </div>
        </div>
        <div className={`mt-3 flex items-center gap-1 text-xs ${hourMessageClass}`}>
          <ClockIcon size={12} />
          <p>{messageHour}</p> 
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex w-max space-x-4 p-4 pt-0">
          {restaurant.menuCategories.map((category) => (
            <Button
              onClick={() => handleCategoryClick(category)}
              key={category.id}
              variant={getCategoryButtonVariant(category)}
              size="sm"
              className="rounded-full"
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <h3 className="px-5 font-semibold pt-2">{selectedCategory.name}</h3>

      <Products products={selectedCategory.products}/>
    </div>
  );
};

export default RestaurantCategories;
