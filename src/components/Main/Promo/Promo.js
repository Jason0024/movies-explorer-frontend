import React from 'react';
import './Promo.css';
import { Link } from 'react-scroll';


function Promo() {
  return (
    <>
      <section className='promo' id='about-project'>
        <div className='promo__wrapper'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo__description'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
          <Link to='about' className='promo__button' smooth={true} duration={600}>
            Узнать больше
          </Link>
        </div>
      </section>
    </>
  );
}

export default Promo;
