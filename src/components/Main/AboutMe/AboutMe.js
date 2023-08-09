import React from 'react';
import myPhoto from '../../../images/myphoto.jpg';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__main-title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__content'>
          <h3 className='about-me__name'>Сергей</h3>
          <p className='about-me__info'>Фронтенд-разработчик, 27 лет</p>
          <p className='about-me__description'>
            Я родился в солнечном Казахстане в маленьком городе Темиртау, в 18 лет уехал учиться в прекрасный, сибирский город Томск,
            где живу и работаю по сей день, закончил Международный Факультет Управления, направление Бизнес-Информатика в ТГУ.
            Люблю компьютерные игры, веселые вечерние посиделки в настолки с друзьями и своего кота :3
            Благодаря курсу Веб-разработчик в Яндекс Практикуме,
            убедился, что мне интересна разработка. Во время обучения, удалось значительно улучшить базовые навыки программирования, теперь хочу развиваться в этом направлении, постоянно
            расширяя и углубляя свои знания.
          </p>
          <a
            href='https://github.com/Jason0024'
            className='about-me__link'
            target='_blank'
            rel="noreferrer">
            Github
          </a>
        </div>
        <img src={myPhoto} alt='фото' className='about-me__photo' />
      </div>
    </section>
  );
}

export default AboutMe;
