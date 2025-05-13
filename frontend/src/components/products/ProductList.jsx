import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';
import ProductService from '../../services/product.service';
import { Grid } from '../../styles/components/Common.styles';

const ProductListWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ProductList = ({ setView, setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setView('edit');
  };

  const handleDelete = async (id) => {
    try {
      await ProductService.deleteProduct(id);
      fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ProductListWrapper>
      <Grid>
        {products.map(product => (
          <ProductCard
            key={product.product_id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Grid>
    </ProductListWrapper>
  );
};

export default ProductList;