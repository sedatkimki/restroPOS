export type Product = {
	id: string;
	name: string;
	description: string;
	price: string;
	category: string;
	image?: string;
};

export type Category = {
	label: string;
	value: string;
};
export const categories: Category[] = [
	{
		label: "Coffee",
		value: "Coffee",
	},
	{
		label: "Tea",
		value: "Tea",
	},
	{
		label: "Juice",
		value: "Juice",
	},
	{
		label: "Soft Drinks",
		value: "Soft Drinks",
	},
	{
		label: "Milkshakes",
		value: "Milkshakes",
	},
	{
		label: "Smoothies",
		value: "Smoothies",
	},
	{
		label: "Cakes",
		value: "Cakes",
	},
	{
		label: "Pastries",
		value: "Pastries",
	},
	{
		label: "Burgers",
		value: "Burgers",
	},
	{
		label: "Pizzas",
		value: "Pizzas",
	},
	{
		label: "Pasta",
		value: "Pasta",
	},
	{
		label: "Salads",
		value: "Salads",
	},
	{
		label: "Soups",
		value: "Soups",
	},
	{
		label: "Appetizers",
		value: "Appetizers",
	},
	{
		label: "Main Course",
		value: "Main Course",
	},
	{
		label: "Desserts",
		value: "Desserts",
	},
	{
		label: "Sides",
		value: "Sides",
	},
	{
		label: "Alcohol",
		value: "Alcohol",
	},
	{
		label: "Cocktails",
		value: "Cocktails",
	},
	{
		label: "Wines",
		value: "Wines",
	},
	{
		label: "Beers",
		value: "Beers",
	},
	{
		label: "Spirits",
		value: "Spirits",
	},
	{
		label: "Liquors",
		value: "Liquors",
	},
	{
		label: "Champagne",
		value: "Champagne",
	},
	{
		label: "Whiskey",
		value: "Whiskey",
	},
	{
		label: "Vodka",
		value: "Vodka",
	},
	{
		label: "Rum",
		value: "Rum",
	},
	{
		label: "Gin",
		value: "Gin",
	},
] as const;
