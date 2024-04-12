import { ProductDto } from "@/api/client";
import Loading from "@/components/layout/Loading";
import { MobilePage } from "@/components/layout/MobilePage";
import useSearch from "@/lib/hooks/useSearch";
import { useCustomerCategories } from "@/lib/queries/customer/useCustomerCategories";
import { useCustomerProducts } from "@/lib/queries/customer/useCustomerProducts";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { CategoryCard } from "../components/search/CategoryCard";
import { SearchHeader } from "../components/search/SearchHeader";

const keysToSearch = ["productName", "productDescription", "categoryTitle"];

const Results = ({
  data,
  searchValue,
}: {
  data?: ProductDto[];
  searchValue: string;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, _] = useSearchParams();

  const filteredData = useMemo(
    () =>
      data?.filter(
        (value) => value.categoryTitle === searchParams.get("category"),
      ) ?? [],
    [data, searchParams],
  );

  const searchResults = useSearch<ProductDto>(
    searchParams.get("category") ? filteredData : data || [],
    searchValue,
    keysToSearch,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Search Results</h1>
        <span className=" text-sm text-muted-foreground">
          {!searchValue && searchParams.get("category")
            ? filteredData?.length
            : searchResults.length}{" "}
          results
        </span>
      </div>
      {!searchValue && searchParams.get("category")
        ? filteredData?.map((item) => (
            <ProductCard fullWidth product={item} key={item.productName} />
          ))
        : searchResults.map((item) => (
            <ProductCard fullWidth product={item} key={item.productName} />
          ))}
    </div>
  );
};

export const Search = () => {
  const { categories, isLoading } = useCustomerCategories();
  const { products } = useCustomerProducts();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MobilePage>
      <MobilePage.Header>
        <MobilePage.TitleContainer>
          <SearchHeader />
        </MobilePage.TitleContainer>
      </MobilePage.Header>
      <MobilePage.Content>
        {searchParams.get("query") || searchParams.get("category") ? (
          <Results
            data={products}
            searchValue={searchParams.get("query") || ""}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {categories?.map((category) => (
              <CategoryCard
                category={category}
                key={category.id}
                onClick={() => {
                  setSearchParams((prev) => {
                    if (category.categoryTitle) {
                      prev.set("category", category.categoryTitle);
                    }
                    return prev;
                  });
                }}
              />
            ))}
          </div>
        )}
      </MobilePage.Content>
    </MobilePage>
  );
};
