import { useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from '../../styles/components/Common.styles';
import AuthService from '../../services/auth.service';

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoginCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 100%;
  max-width: 400px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.primary};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(credentials.username, credentials.password);
      window.location.href = '/products'; // Redirect after successful login
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Product Management</Title>
        <LoginForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" size="large">
            Login
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
