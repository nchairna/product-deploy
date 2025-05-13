import styled from 'styled-components';

const ErrorContainer = styled.div`
  padding: 1rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ErrorMessage = ({ message }) => (
  <ErrorContainer>
    <span>⚠️</span>
    <p>{message}</p>
  </ErrorContainer>
);

export default ErrorMessage;