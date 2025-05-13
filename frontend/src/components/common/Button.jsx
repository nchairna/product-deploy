import styled from 'styled-components';

const StyledButton = styled.button`
  padding: ${props => props.size === 'small' ? '0.5rem 1rem' : '0.75rem 1.5rem'};
  background-color: ${props => {
    switch(props.variant) {
      case 'danger':
        return '#ff4444';
      case 'secondary':
        return '#757575';
      default:
        return '#2196f3';
    }
  }};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button',
  ...props 
}) => (
  <StyledButton
    variant={variant}
    size={size}
    type={type}
    {...props}
  >
    {children}
  </StyledButton>
);

export default Button;