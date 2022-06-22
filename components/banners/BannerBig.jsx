import React from 'react'
import './bannerbig.scss'
import Button from '../button/Button'
import Card from '../card/Card'
// import Accordion from '../accordioncard/Accordioncard'


const BannerBig = () => {
  return (
    <div className="bannerbig">
      <div className="bannerbig__info">
        <h1>A tua à distância de um click!</h1>
        <div className="bannerbig__btn">
          <Button />
          <Card />
          {/* <a className='bannerbig__btn__white' href="/">Encontrar</a>
          <a className='bannerbig__btn__white' href="/">Entrada</a>
          <a className='bannerbig__btn__white' href="/">Saída</a> */}
          <a href="/" className='bannerbig__btn__search' alt="">dd</a>
        
        </div>
      </div>
    </div>
  )
}

export default BannerBig