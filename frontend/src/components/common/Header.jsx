import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: white;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  cursor: pointer;
  font-weight: bold;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    transform: translateY(-1px);
  }
`;

const Username = styled.span`
  font-weight: 500;
`;

const Header = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <Nav>
        <Title>Product Management System</Title>
        <UserInfo>
          <Username>Welcome, {currentUser?.username || 'Admin'}</Username>
          <Button onClick={handleLogout}>Logout</Button>
        </UserInfo>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;