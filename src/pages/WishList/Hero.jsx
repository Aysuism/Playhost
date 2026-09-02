import React from 'react'
import { useContext } from 'react'
import { LangContext } from '../../context/LangContext'

const Hero = () => {
  const { lang } = useContext(LangContext)
  
  return (
    <section className="hero">
      <div className="container">
        <span>{lang === 'AZ' ? 'Seçilmişlər' : 'Fav Items'}</span>
        <h1>{lang === 'AZ' ? 'İstək siyahısı' : 'Wishlist'}</h1>
        <p>
          {lang === 'AZ' 
            ? 'Biz öyrənmə, kəşf etmə və əlaqə qurma ehtirası ilə idarə olunuruq. Platformamızı təkmilləşdirmək, yeni texnologiyaları tətbiq etmək və istifadəçilərimizin dəyişən ehtiyaclarına uyğunlaşmaq üçün daim çalışırıq.' 
            : 'We are driven by a passion for learning, discovery, and connection. We constantly strive to enhance our platform, incorporate emerging technologies, and adapt to the evolving needs of our users.'
          }
        </p>
      </div>
    </section>
  )
}

export default Hero