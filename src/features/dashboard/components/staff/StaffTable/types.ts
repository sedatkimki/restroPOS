import { BadgeProps } from "@/components/ui/badge";
import { UserRoles } from "@/lib";
import { ChefHat, HandCoins, HandPlatter, LucideIcon } from "lucide-react";

// TODO - refactor to use enum instead of string

export type roleType = {
  value: UserRoles;
  label: string;
  icon: LucideIcon;
  badgeColor: BadgeProps["variant"];
};

export const roles: roleType[] = [
  {
    value: UserRoles.WAITER,
    label: "Waiter",
    icon: HandPlatter,
    badgeColor: "orange",
  },
  {
    value: UserRoles.CASH_DESK,
    label: "Cash Register",
    icon: HandCoins,
    badgeColor: "blue",
  },
  {
    value: UserRoles.KITCHEN,
    label: "Kitchen",
    icon: ChefHat,
    badgeColor: "yellow",
  },
] as const;
