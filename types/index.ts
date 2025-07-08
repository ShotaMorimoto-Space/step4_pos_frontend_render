// types/index.ts

export type Product = {
  prd_id: number;
  code: string;
  name: string;
  price: number;
  image_url?: string;
};

export type CartItem = Product & {
  qty: number;
};

// ↓ PurchaseRequest / PurchaseResponse も必要なら追加
export type PurchaseRequest = {
  emp_cd: string;
  store_cd: string;
  pos_no: string;
  payment_method: string;
  items: CartItem[];
};

export type PurchaseResponse = {
  success: boolean;
  total_amt_ex_tax: number;
  total_tax_amt: number;
  total_amt: number;
};
