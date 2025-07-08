// components/ProductSearch.tsx
import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchProduct } from '../utils/api';
import { Product } from '../types';

type Props = {
  onAddProduct: (product: Product) => void;
};

const ProductSearch: React.FC<Props> = ({ onAddProduct }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!code) return;
    try {
      const product = await fetchProduct(code);
      onAddProduct(product);
      setCode('');
      setError(null);
    } catch (e: any) {
      setError('商品が見つかりませんでした');
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="商品コード"
        variant="outlined"
        fullWidth
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={!!error}
        helperText={error}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ProductSearch;
