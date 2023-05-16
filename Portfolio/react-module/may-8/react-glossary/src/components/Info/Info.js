import { useState, useEffect } from 'react';

const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories';
const CATEGORY_URL = 'https://fakestoreapi.com/products/category/';

export default function Info() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getAll() {
      const res = await fetch(CATEGORIES_URL);
      const categories = await res.json();
      const newCategories = categories.map(async (cat) => {
        const res = await fetch(CATEGORY_URL + cat);
        const prodsByCat = await res.json();
        return { cat, prodsByCat };
      });
      setCategories(await Promise.all(newCategories));
    }
    getAll();
  }, []);

  return (
    <>
      <h1>App</h1>
      <div style={{ display: 'flex', textAlign: 'center', gap: '0.5rem' }}>
        {categories.map((c, i) => (
          <div key={i}>{c.cat}</div>
        ))}
      </div>
    </>
  );
}
