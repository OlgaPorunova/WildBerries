import React, { useState } from 'react';

const categories = [
  { id: 1, name: 'Electronics' },
  { id: 2, name: 'Clothing' },
  { id: 3, name: 'Home' },
];

const products = [
  { id: 1, name: 'Laptop', categoryId: 1 },
  { id: 2, name: 'Smartphone', categoryId: 1 },
  { id: 3, name: 'T-Shirt', categoryId: 2 },
  { id: 4, name: 'Pants', categoryId: 2 },
  { id: 5, name: 'Chair', categoryId: 3 },
  { id: 6, name: 'Table', categoryId: 3 },
];

export default function Photo() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category, event) => {
    event.preventDefault();
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2>Industry Categories</h2>
      <ul>
        {categories.map((category) => (
          <button onClick={(event) => handleCategoryClick(category, event)} type="button">
            {category.name}
          </button>
        ))}
      </ul>
      {selectedCategory && (
        <div>
          <h2>
            Products found in
            {' '}
            {selectedCategory.name}
            {' '}
            category
          </h2>
          <ul>
            {products
              .filter((product) => product.categoryId === selectedCategory.id)
              .map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
