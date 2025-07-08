// utils/api.ts
import { Product, PurchaseRequest, PurchaseResponse } from '../types';

const API_BASE_URL = 'https://step4-pos-backend-render.onrender.com/api/v1'; // FastAPI のURLに合わせて調整

export const fetchProduct = async (code: string): Promise<Product> => {
  const res = await fetch(`${API_BASE_URL}/product/${code}`);
  if (!res.ok) throw new Error('商品が見つかりませんでした');
  return await res.json();
};

export const purchaseItems = async (payload: PurchaseRequest): Promise<PurchaseResponse> => {
  const res = await fetch(`${API_BASE_URL}/purchase/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('購入に失敗しました');
  return await res.json();
};
