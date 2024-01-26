import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useWorkspace(){
  // TODO : use this to determine if we are in a workspace or not
  return getSubdomain(window.location.href);
}

export function getSubdomain(url: string): string {
  const hostname = new URL(url).hostname;
  const subdomain = hostname.split('.').filter(part => part !== 'www')[0];

  return subdomain;
}
