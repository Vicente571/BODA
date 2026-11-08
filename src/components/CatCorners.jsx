import React from 'react'
import { WEDDING } from '../config'

const CAT_IMAGES = {
  top: { left: '/Gato1.png', right: '/Gato2.png' },
  bottom: { left: '/Gato3.png', right: '/Gato4.png' },
}

function CatDecoration({ position, side }) {
  const image = WEDDING.fotoGatita || CAT_IMAGES[position][side]

  return (
    <div className={`pet-photo-slot pet-photo-${side}`}>
      <img src={image} alt="" />
    </div>
  )
}

export default function CatCorners({ position }) {
  return (
    <div className={`pet-photo-corners pet-photo-corners-${position}`} aria-hidden="true">
      <CatDecoration position={position} side="left" />
      <CatDecoration position={position} side="right" />
    </div>
  )
}
