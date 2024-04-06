import { MobilePage } from "@/components/layout/MobilePage";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchInput } from "@/components/ui/search-input";
import usePaginatedFilterList from "@/lib/hooks/useSearch";
import useSearch from "@/lib/hooks/useSearch";
import { ScrollAreaScrollbar } from "@radix-ui/react-scroll-area";
import { useState } from "react";

import { ProductCard } from "../components/ProductCard";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

const dummyData: Product[] = [
  {
    id: "1",
    name: "Apple",
    category: "Fruit",
    price: 10,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "2",
    name: "Banana",
    category: "Fruit",
    price: 20,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "3",
    name: "Carrot",
    category: "Vegetable",
    price: 30,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "4",
    name: "Broccoli",
    category: "Vegetable",
    price: 40,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "5",
    name: "Milk",
    category: "Dairy",
    price: 50,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "6",
    name: "Cheese",
    category: "Dairy",
    price: 60,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "7",
    name: "Bread",
    category: "Bakery",
    price: 70,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "8",
    name: "Cake",
    category: "Bakery",
    price: 80,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "9",
    name: "Chicken",
    category: "Meat",
    price: 90,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "10",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "11",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "12",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "13",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "14",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "15",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "16",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "17",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
  {
    id: "18",
    name: "Beef",
    category: "Meat",
    price: 100,
    image:
      "https://cdn.yemek.com/mnresize/1250/833/uploads/2023/11/beyti-yemekcom.jpg",
  },
];

const keysToSearch = ["name", "category"];
const Results = ({ data, searchValue }) => {
  const searchResults = useSearch<Product>(data, searchValue, keysToSearch);

  return (
    <div className="flex flex-col gap-4 pb-16">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Search Results</h1>
        <span className=" text-sm text-muted-foreground">
          {searchResults.length} results
        </span>
      </div>
      {searchResults.map((item) => (
        <ProductCard fullWidth product={item} key={item.id} />
      ))}
    </div>
  );
};

// todo: implement url state for search
export const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <SearchInput
            type="text"
            placeholder="search products"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </MobilePage.TitleContainer>
      </MobilePage.Header>
      <MobilePage.Content>
        <ScrollArea className="flex flex-col gap-4">
          <Results data={dummyData} searchValue={searchValue} />
          <ScrollAreaScrollbar orientation="vertical" />
        </ScrollArea>
      </MobilePage.Content>
    </MobilePage>
  );
};
