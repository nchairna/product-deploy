import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global.styles';
import { theme } from './styles/theme';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import Login from './components/auth/Login';
import Header from './components/common/Header';
import { Container } from './styles/components/Common.styles';
import AuthService from './services/auth.service';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = AuthService.isAuthenticated();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [view, setView] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Header />
                <Container>
                  <ProductForm 
                    view={view} 
                    setView={setView}
                    selectedProduct={selectedProduct}
                    setSelectedProduct={setSelectedProduct}
                  />
                  <ProductList 
                    setView={setView}
                    setSelectedProduct={setSelectedProduct}
                  />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;