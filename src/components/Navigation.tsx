import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/products/add">Add/Edit Product</Link>
        </li>
        <li>
          <Link to="/suppliers">Supplier Management</Link>
        </li>
        <li>
          <Link to="/inventory">Inventory Management</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
