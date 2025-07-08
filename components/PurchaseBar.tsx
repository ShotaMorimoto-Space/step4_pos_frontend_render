// components/PurchaseBar.tsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type Props = {
  itemCount: number;
  total: number;
  onClickSummary: () => void;
};

const PurchaseBar: React.FC<Props> = ({ itemCount, total, onClickSummary }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        p: 2,
        bgcolor: 'white',
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Button
        startIcon={<ShoppingCartIcon />}
        onClick={onClickSummary}
        sx={{ textTransform: 'none', fontWeight: 'bold' }}
        variant="contained"
        color="primary"
      >
        {itemCount} items
      </Button>
      <Typography variant="h6" color="primary">
        Total: ¥{total.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default PurchaseBar;
