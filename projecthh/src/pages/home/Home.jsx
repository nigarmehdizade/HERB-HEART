import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';


const heroData = [
  {
    image:'https://elanbio.ca/cdn/shop/files/ELAN_BIO_SLIDER_3_3024x.webp?v=1686149110',
    title: 'ONLY THE BEST FROM ELAN',
    subtitle: 'Natural, organic and GMO free',
  },
  {
    image: 'https://elanbio.ca/cdn/shop/files/ELAN_BIO_SLIDER_2_3024x.webp?v=1686149110',
    title: 'REAL FOOD, REALLY SIMPLE',
    subtitle: 'Delicious whole foods',
  },
  {
    image: 'https://elanbio.ca/cdn/shop/files/ELAN_BIO_SLIDER_3_3024x.webp?v=1686149110',
    title: 'FRESHNESS AND FLAVOR',
    subtitle: 'Packed with the highest quality ingredients',
  },
  // {
  //   image: 'https://elanbio.ca/cdn/shop/files/33024P_Top_Organicmatchagreenteapowder_720x.jpg?v=1744055313',
  //   title: 'WHISK IT ALL FOR MATCHA',
  //   subtitle: 'Our matcha is finally back',
  // },
];



const Home = () => {
   const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === heroData.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [])


  return (
    <div className={styles.home}>
   
      {heroData[currentIndex] && (
        <div className={styles.heroSlider}>
          <img
            src={heroData[currentIndex].image}
            alt="Hero Slide"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay}></div>
          <div className={styles.heroContent}>
            <h1>{heroData[currentIndex].title}</h1>
            <p>{heroData[currentIndex].subtitle}</p>
          </div>
        </div>
      )}


      <div className={styles.organicSection}>
        <h2>NATURALLY ORGANIC</h2>
        <p>
          Our exclusive organic products are carefully chosen to offer you a selection that is rich in flavour,
          texture, and freshness. Every one of our products is certified organic, gluten-free, and GMO free.
        </p>
      </div>
       <h2>OUR PRODUCTS</h2>
      {loading && <p>Yüklənir...</p>}
      {error && <p>Xəta baş verdi: {error}</p>}
      
      <div className={styles.productGrid}>
       {items.map((product) => {
  const updatedProduct = {
    ...product,
    hoverImage: 'https://elanbio.ca/cdn/shop/files/33024P_Top_Organicmatchagreenteapowder_720x.jpg?v=1744055313' // test üçün eyni şəkil hamıya
  };
  return <ProductCard key={product._id} product={updatedProduct} />;
})}
      </div>
<div className={styles.viewAllWrapper}>
  <Link to="/home" className={styles.viewAllButton}>
    VIEW ALL
  </Link>
</div>
<div className={styles.splitSection}>
  <div className={styles.splitBlock} style={{ backgroundImage:"url('https://elanbio.ca/cdn/shop/files/OUR-STORY_d6ff3289-6d55-4752-b78c-df2d5b52afc6_1728x.jpg?v=1617287026')" }}>
    <div className={styles.overlay}>
      <h2>OUR STORY</h2>
      <p>Read about how we started, our vision, and our goals</p>
     <Link to="/ingredients" className={styles.splitButton}>
  LEARN MORE HERE
</Link>
    </div>
  </div>

  <div className={styles.splitBlock} style={{ backgroundImage: "url('https://elanbio.ca/cdn/shop/files/OUR-INGREDIENTS-5_1728x.jpg?v=1618511585')" }}>
    <div className={styles.overlay}>
      <h2>OUR INGREDIENTS</h2>
      <p>Learn about how we pick and choose our ingredients for our snacks</p>
    <Link to="/ingredients" className={styles.splitButton}>
  LEARN MORE HERE
</Link>
    </div>
  </div>
</div>
<div className={styles.recipesSection}>
  <div className={styles.recipesOverlay}>
    <h2>EXPLORE OUR RECIPES</h2>
    <a
      href="https://elanbio.ca/blogs/recipes"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.recipesButton}
    >
      BROWSE HERE
    </a>
  </div>
</div>
<div className={styles.certificationsSection}>
  <h2>OUR CERTIFICATIONS</h2>
  <div className={styles.certificationLogos}>
    <img src="https://elanbio.ca/cdn/shop/files/CERTIFICATION_LOGOS-01_360x.jpg?v=1614308072" alt="Canada Organic" />
    <img src="https://elanbio.ca/cdn/shop/files/CERTIFICATION_LOGOS-02_360x.jpg?v=1614308072" alt="USDA Organic" />
    <img src="https://elanbio.ca/cdn/shop/files/CERTIFICATION_LOGOS-03_360x.jpg?v=1614308072" alt="Gluten Free" />
    <img src="https://elanbio.ca/cdn/shop/files/CERTIFICATION_LOGOS-04_360x.jpg?v=1614308072" alt="Vegan" />
    <img src="https://elanbio.ca/cdn/shop/files/CERTIFICATION_LOGOS-05_360x.jpg?v=1614308072" alt="GMO Free" />
    <img src="https://elanbio.ca/cdn/shop/files/CERTIFICATION_LOGOS-06_360x.jpg?v=1614308072" alt="Ecocert" />
  </div>
</div>

    </div>
  );
};

export default Home;
