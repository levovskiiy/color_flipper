'use strict'

const [toHexButton, toRgbButton, flipButton, copyButton] = document.querySelectorAll('.content__button')
const color = document.querySelector('.content__color-value')
const bg = document.querySelector('.page')
const tooltip = document.querySelector('.content__tooltip-copied')

const getColor = () => color.textContent
const insertColor = insertedColor => (color.textContent = insertedColor)

const flipBgColor = () => {
  const hex = generateRandomHex()
  bg.style.backgroundColor = hex
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
  return color.match(/\d+/g).reduce((acc, num) => acc + parseInt(num).toString(16), '#')
}

const generateRandomHex = () => {
  let result = '#'
  for (let i = 0; i < 6; i++) {
    const randomDecimal = Math.floor(Math.random() * 16)
    result += randomDecimal.toString(16)
  }

  return result.toUpperCase()
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
