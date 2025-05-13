import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../styles/components/Common.styles';
import { useState } from 'react';

const ProductCardWrapper = styled(Card)`
  position: relative;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1.2rem;
`;

const ProductPrice = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.2rem;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 255, 255, 0.9);
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  color: ${props => props.delete ? props.theme.colors.danger : props.theme.colors.primary};
  transition: ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { prod_name, price, description, imageURL } = product;
  const [imgSrc, setImgSrc] = useState(() => {
    // Log the initial image URL for debugging
    console.log('Initial imageURL:', imageURL);
    return imageURL && imageURL.trim() ? imageURL : '/images/default-product.jpg';
  });

  const handleEdit = () => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Call the original onEdit function
    onEdit(product);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.product_id);
    }
  };

  const handleImageError = () => {
    console.log('Image failed to load:', imgSrc);
    // If the image is a local path, try prepending the public URL
    if (imgSrc.startsWith('/images/')) {
      const publicUrl = process.env.PUBLIC_URL || '';
      const newSrc = `${publicUrl}${imgSrc}`;
      console.log('Trying with public URL:', newSrc);
      setImgSrc(newSrc);
    } else {
      setImgSrc('/images/default-product.jpg');
    }
  };

  return (
    <ProductCardWrapper>
      <ProductImage 
        src={imgSrc}
        alt={prod_name}
        onError={handleImageError}
      />
      <ActionButtons>
        <IconButton onClick={handleEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </IconButton>
        <IconButton delete onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </ActionButtons>
      <ProductTitle>{prod_name}</ProductTitle>
      <ProductPrice>${parseFloat(price).toFixed(2)}</ProductPrice>
      <ProductDescription>{description}</ProductDescription>
    </ProductCardWrapper>
  );
};

export default ProductCard;