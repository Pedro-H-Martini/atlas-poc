import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import camelcaseKeys from "camelcase-keys"
import snakecaseKeys from "snakecase-keys"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Recursively convert object keys from snake_case to camelCase
 */
export function snakeToCamel<T = any>(obj: any, options?: { deep?: boolean }): T {
  if (obj === null || obj === undefined) {
      return obj
  }
  return camelcaseKeys(obj, { deep: options?.deep ?? true }) as T
}

/**
* Recursively convert object keys from camelCase to snake_case
*/
export function camelToSnake<T = any>(obj: any, options?: { deep?: boolean }): T {
  if (obj === null || obj === undefined) {
      return obj
  }
  return snakecaseKeys(obj, { deep: options?.deep ?? true }) as T
}