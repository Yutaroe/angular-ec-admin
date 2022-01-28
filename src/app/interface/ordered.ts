export interface Ordered {
  id: number;
  item_number: number;
  coffee_id: number;
  item_size: string;
  toppings: number[];
  carts: number;
  day?: string;
  time?: number | undefined;
  name?: string;
  addressNumber: string | undefined;
  address?: string;
  status?: number;
}
