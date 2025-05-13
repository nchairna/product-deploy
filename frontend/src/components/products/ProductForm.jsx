import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import ProductService from '../../services/product.service';

const FormContainer = styled.div`
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: grid;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const TextArea = styled.textarea`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 100px;
  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #1976d2;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.8rem;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const ProductForm = ({ view, setView, selectedProduct, setSelectedProduct }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

  useEffect(() => {
    if (view === 'edit' && selectedProduct) {
      setValue('name', selectedProduct.prod_name);
      setValue('price', selectedProduct.price);
      setValue('description', selectedProduct.description);
      setValue('imageURL', selectedProduct.imageURL);
    } else {
      reset();
    }
  }, [view, selectedProduct, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      // Ensure imageURL is properly formatted
      const formData = {
        ...data,
        imageURL: data.imageURL.trim() || null // Use null if empty
      };

      if (view === 'edit' && selectedProduct) {
        await ProductService.updateProduct(selectedProduct.product_id, formData);
      } else {
        await ProductService.addProduct(formData);
      }
      reset();
      setView('add');
      setSelectedProduct(null);
      window.location.reload(); // Force refresh to update the product list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{view === 'edit' ? 'Edit Product' : 'Add New Product'}</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Product Name</Label>
          <Input
            {...register('name', { required: 'Product name is required' })}
            placeholder="Enter product name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Price</Label>
          <Input
            type="number"
            step="0.01"
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' }
            })}
            placeholder="Enter price"
          />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            {...register('description', { required: 'Description is required' })}
            placeholder="Enter product description"
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Image URL</Label>
          <Input
            {...register('imageURL', {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)|\/images\/.*\.(?:png|jpg|jpeg|gif|webp))$/i,
                message: 'Please enter either a valid image URL or a path to local image (e.g., /images/product.jpg)'
              }
            })}
            placeholder="Enter image path (e.g., /images/product.jpg) or URL"
          />
          {errors.imageURL && <ErrorMessage>{errors.imageURL.message}</ErrorMessage>}
        </FormGroup>

        <Button type="submit">
          {view === 'edit' ? 'Update Product' : 'Add Product'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProductForm;