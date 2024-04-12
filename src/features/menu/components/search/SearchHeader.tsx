import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SearchInput } from "@/components/ui/search-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const SearchInputFormSchema = z.object({
  search: z.string(),
});

export const SearchHeader: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm<z.infer<typeof SearchInputFormSchema>>({
    resolver: zodResolver(SearchInputFormSchema),
    defaultValues: {
      search: searchParams.get("query") || "",
    },
  });

  const onSubmit = (data: z.infer<typeof SearchInputFormSchema>) => {
    setSearchParams((prev) => {
      prev.set("query", data.search);
      return prev;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
        {searchParams.get("query") || searchParams.get("category") ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 "
            type="button"
            onClick={() => {
              form.setValue("search", "");
              setSearchParams();
            }}
          >
            <ChevronLeft className="w-8 h-8" strokeWidth={1} />
          </Button>
        ) : null}

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <SearchInput placeholder="search products" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
