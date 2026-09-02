import React from 'react';
import { useGetCategoryQuery } from '../../dashboard/tools/api/games-category';
import { useContext } from 'react';
import { LangContext } from '../../context/LangContext';

const CategoryBtn = ({ selectCategory, resetCategory, activeCategory, handleSort, sortOption }) => {
  const { lang } = useContext(LangContext)
  const { data: categories=[]} = useGetCategoryQuery();

  return (
    <section className="category-btn mb-4">
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-2">
        <button className={`${activeCategory ? 'btn' : 'btn-active'}`} onClick={resetCategory}>{lang === 'AZ' ? 'Bütün oyunlar' : 'All Games'}</button>

        {categories.map((category) => (
          <button key={category._id} className={`${activeCategory === category.categoryId ? 'btn-active' : 'btn'}`}
            onClick={() => selectCategory(category.categoryId)}>{category.category}</button>
        ))}

        {/* Sort dropdown */}
        <div className="dropdown ms-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="sortDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {lang === 'AZ' ? 'Sıralama' : 'Sort By'}
          </button>
          <ul className="dropdown-menu" aria-labelledby="sortDropdown">
            <li>
              <button
                className={`dropdown-item ${sortOption === 'default' ? 'active' : ''}`}
                onClick={() => handleSort('default')}
              >
                {lang === 'AZ' ? 'Bütün oyunlar' : 'All Games'}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${sortOption === 'rating-high' ? 'active' : ''}`}
                onClick={() => handleSort('rating-high')}
              >
                {lang === 'AZ' ? 'Ən Yüksək Reytinq' : 'Highest Rating'}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${sortOption === 'price-low' ? 'active' : ''}`}
                onClick={() => handleSort('price-low')}
              >
                {lang === 'AZ' ? 'Qiymət: Aşağıdan Yuxarıya' : 'Price: Low to High'}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${sortOption === 'price-high' ? 'active' : ''}`}
                onClick={() => handleSort('price-high')}
              >
                {lang === 'AZ' ? 'Qiymət: Yuxarıdan Aşağıya' : 'Price: High to Low'}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${sortOption === 'discount-high' ? 'active' : ''}`}
                onClick={() => handleSort('discount-high')}
              >
                {lang === 'AZ' ? 'Ən Böyük Endirim' : 'Biggest Discount'}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${sortOption === 'name-asc' ? 'active' : ''}`}
                onClick={() => handleSort('name-asc')}
              >
                {lang === 'AZ' ? 'Ad: A-Z' : 'Name: A-Z'}
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${sortOption === 'name-desc' ? 'active' : ''}`}
                onClick={() => handleSort('name-desc')}
              >
                {lang === 'AZ' ? 'Ad: Z-A' : 'Name: Z-A'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CategoryBtn;