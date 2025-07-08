// components/PaymentDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CartItem } from '../types';

type Props = {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  onPurchase: (paymentMethod: string) => void;
};

const PaymentDialog: React.FC<Props> = ({ open, onClose, cart, onPurchase }) => {
  const [paymentMethod, setPaymentMethod] = useState('Sara Pay');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = Math.floor(total * 0.1);
  const totalWithTax = total + tax;

  const handlePurchase = () => {
    if (paymentMethod) {
      onPurchase(paymentMethod);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: 600, fontSize: '1.25rem' }}>カート</span>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
          Total: ¥{totalWithTax.toLocaleString()}（税込）
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          税抜: ¥{total.toLocaleString()} / 消費税: ¥{tax.toLocaleString()}
        </Typography>

        <Typography sx={{ mb: 1 }}>支払方法を選択</Typography>
        <ToggleButtonGroup
          value={paymentMethod}
          exclusive
          onChange={(e, value) => value && setPaymentMethod(value)}
          fullWidth
        >
          <ToggleButton value="Sara Pay">Sara Pay</ToggleButton>
          <ToggleButton value="Hibi Pay">Hibi Pay</ToggleButton>
          <ToggleButton value="Cash">Cash</ToggleButton>
        </ToggleButtonGroup>
      </DialogContent>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePurchase}
          disabled={cart.length === 0}
        >
          Purchase
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentDialog;
