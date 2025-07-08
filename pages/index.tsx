import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProductSearch from '../components/ProductSearch';
import ProductCard from '../components/ProductCard';
import PurchaseBar from '../components/PurchaseBar';
import PaymentDialog from '../components/PaymentDialog';
import { Product, CartItem } from '../types';
import { purchaseItems } from '../utils/api';

const IndexPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddProduct = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.code === product.code);
      if (exists) {
        return prev.map((item) =>
          item.code === product.code ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const handleRemoveProduct = (code: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.code === code ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handlePurchase = async (paymentMethod: string) => {
    const payload = {
      emp_cd: '9999999999',
      store_cd: '30',
      pos_no: '90',
      payment_method: paymentMethod,
      items: cart.map(({ prd_id, code, name, price, qty }) => ({
        prd_id,
        code,
        name,
        price,
        qty,
      })),
    };

    try {
      const res = await purchaseItems(payload);
      alert(`購入完了！ 合計: ¥${res.total_amt.toLocaleString()}`);
      setCart([]);
      setShowModal(false);
    } catch (e) {
      alert('購入処理に失敗しました');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Box sx={{ bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          py: 2,
          px: 3,
          bgcolor: 'white',
          borderBottom: '1px solid #ddd',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <Typography
  variant="h4"
  align="center"
  component="div"
  sx={{
    fontWeight: 700,
    letterSpacing: 1,
    color: '#1976d2',
    fontFamily: 'Oswald, sans-serif', // ✅ 明示指定もOK
  }}
>
  PayPayPay
</Typography>

      </Box>

      {/* Main content */}
      <Container maxWidth="sm" sx={{ py: 2 }}>
        <ProductSearch onAddProduct={handleAddProduct} />

        {cart.map((item) => (
          <ProductCard
            key={item.code}
            product={item}
            quantity={item.qty}
            onClick={() => {}}
            onRemove={() => handleRemoveProduct(item.code)}
          />
        ))}
      </Container>

      {/* Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: 'white',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
          px: 2,
          pb: 1,
          zIndex: 10,
        }}
      >
        <PurchaseBar
          itemCount={cart.reduce((sum, item) => sum + item.qty, 0)}
          total={total}
          onClickSummary={() => setShowModal(true)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 1 }}>
          <Box
            sx={{
              border: '2px solid #1976d2',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              color: '#1976d2',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              fontFamily: '"Edu NSW ACT Hand Cursive", cursive',
            }}
          >
            📷 スキャン
          </Box>
        </Box>
      </Box>

      {/* Dialog */}
      <PaymentDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        cart={cart}
        onPurchase={handlePurchase}
      />
    </Box>
  );
};

export default IndexPage;
