// components/ProductCard.tsx
import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Badge,
  IconButton,
} from '@mui/material';
import { Product } from '../types';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

type Props = {
  product: Product;
  quantity: number;
  onClick: () => void;
  onRemove: () => void;
};

const ProductCard: React.FC<Props> = ({ product, quantity, onClick, onRemove }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: 3,
        mb: 2,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      elevation={3}
      onClick={onClick}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 2, m: 1 }}
          image={product.image_url || '/noimage.png'}
          alt={product.name}
        />
        <Box>
          <Typography variant="body1">{product.name}</Typography>
          <Typography variant="body2" color="primary">
            ¥{product.price}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', pr: 2 }}>
        <Badge badgeContent={quantity} color="primary" sx={{ mr: 1 }}>
          <ShoppingCartIcon />
        </Badge>
        <IconButton onClick={(e) => { e.stopPropagation(); onRemove(); }}>
          <RemoveCircleOutlineIcon color="error" />
        </IconButton>
      </Box>
    </Card>
  );
};

export default ProductCard;
