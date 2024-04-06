import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import * as React from "react";

import { Button } from "./button";
import { Input } from "./input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        <div className="text-muted-foreground absolute left-2 top-1/2 flex h-4 -translate-y-1/2 transform items-center  p-0 text-sm">
          <Search size={16} />
        </div>
        <Input
          type={type}
          className={cn("pl-8", className)}
          ref={ref}
          {...props}
        />
        {props.value && (
          <Button
            variant={"ghost"}
            size={"icon"}
            className=" absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 transform items-center  p-0 text-sm cursor-pointer"
            onClick={() => {
              props.onChange?.({
                target: { value: "" },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
          >
            <X size={16} />
          </Button>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "Search";

export { SearchInput };
