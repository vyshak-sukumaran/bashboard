import { useSearchParams } from "react-router-dom";

type ValuesType = Record<string, any>;

/**
 * Custom hook that manages the state of URL parameters.
 * 
 * @template T - The type of the values object.
 * @param {T} values - The values object containing the initial state.
 * @returns A tuple containing the current URL state and a function to update it.
 */
export function useURLState<T extends ValuesType>(values: T) {
  const [searchParams, setSearchParams] = useSearchParams(values);

  const urlState = getAllURLState();

  /**
   * Retrieves all URL parameters and their corresponding values.
   * 
   * @returns {T} - The URL parameters and their values.
   */
  function getAllURLState() : T {
    const keys: (keyof T)[] = Object.keys(values) as (keyof T)[];
    let params: Partial<T> = {};
    keys.forEach((key) => {
      const value = searchParams.get(key as string);
      if (value === null) return;
      params[key] = parseValue(key as string, value) as T[keyof T];
    });
    return params as T;
  }

  /**
   * Parses the value of a URL parameter based on its type.
   * 
   * @param {string} key - The key of the URL parameter.
   * @param {string | null} value - The value of the URL parameter.
   * @returns {string | number | boolean | null} - The parsed value of the URL parameter.
   */

  function parseValue(key: string, value: string | null) : string | number | boolean | null {
    if (!value) return null;
    const ValuesType = typeof values[key];
    switch (ValuesType) {
      case "string":
        return value;
      case "number":
        return Number(value);
      case "boolean":
        return value === "true";
      default:
        return value;
    }
  }
/**
   * Updates the state of URL parameters.
   * 
   * @param {Partial<T> | ((previousValue: Partial<T>) => Partial<T>)} newValueOrCallback - The new value or a callback function to update the previous value.
   */
  function setURLState(
    newValueOrCallback: Partial<T> | ((previousValue: Partial<T>) => Partial<T>)
  ) {
    const newValue =
      typeof newValueOrCallback === "function"
        ? newValueOrCallback(urlState)
        : newValueOrCallback;

        const updatedSearchParams = new URLSearchParams();

        for (const key in newValue) {
          updatedSearchParams.set(key, newValue[key] as string);
        }
    
        setSearchParams(updatedSearchParams, { replace: true });
  }

  return [urlState, setURLState] as const;
}
