'use strict'

const [toHexButton, toRgbButton, flipButton, copyButton] = document.querySelectorAll('.content__button')
const color = document.querySelector('.content__color-value')
const bg = document.querySelector('.page')
const tooltip = document.querySelector('.content__tooltip-copied')

const getColor = () => color.textContent
const insertColor = insertedColor => (color.textContent = insertedColor)

const flipBgColor = () => {
  const hex = generateRandomHex()
  console.log(hex)
  bg.style.backgroundColor = `#${hex}`
  insertColor(hex)
}

/**
 * Функция сонвертирует из шестнадцетеричного представления цвета в rgb.
 * @param {String} color
 * @returns {String}
 */
const toRgb = color => {
  const numbers = color
    .match(/\d{2}|\w{2}/g)
    .map(n => parseInt(n, 16))
    .join(', ')

  return `rgb(${numbers})`
}

/**
 * Функция преобразовывает из представления цвета rgb в шестнадцетеричное представление.
 * @param {String} color - строка чисел для каждого цвета rgb
 * @returns {String}
 */
const toHex = color => {
  const [r, g, b] = color.match(/\d+/g).map(v => Number(v))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

const generateRandomHex = () => {
  const randomHex = Math.floor(Math.random() * 0xffffff).toString(16)
  return `${randomHex.padEnd(6, '0')}`
}

flipButton.addEventListener('click', flipBgColor)

toRgbButton.addEventListener('click', () => {
  const color = getColor()
  if (!color.startsWith('rgb')) {
    insertColor(toRgb(color))
  }
})

toHexButton.addEventListener('click', () => {
  const color = getColor()
  if (!color.startsWith('#')) {
    insertColor(toHex(color))
  }
})

copyButton.addEventListener('click', evt => {
  navigator.clipboard.writeText(getColor())
  tooltip.classList.add('content__tooltip-copied_visible')
  setTimeout(() => tooltip.classList.remove('content__tooltip-copied_visible'), 1000)
})
