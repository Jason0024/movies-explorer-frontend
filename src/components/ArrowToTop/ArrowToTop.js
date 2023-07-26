import React, { useEffect, useState } from 'react';
import './ArrowToTop.css';
import { Link } from 'react-scroll';
import arrowIco from '../../images/up-arrow.svg';

function ArrowToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = window.innerHeight * 0.3;
      const currentPosition = window.scrollY;

      if (currentPosition > scrollOffset) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`scroll ${isVisible ? 'visible' : ''}`}>
        <Link to='header' smooth={true} duration={600}>
          <img src={arrowIco} alt='Скролл вверх' className='scroll__image' />
        </Link>
      </div>
    </>
  );
}

export default ArrowToTop;
