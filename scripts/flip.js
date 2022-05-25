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

const toRgb = color => {
  if (color.startsWith('rgb')) {
    return
  }

  color = color.slice(1)

  let rgbColor = []
  for (let i = 0; i < color.length; i += 2) {
    rgbColor.push(parseInt(color.slice(i, i + 2), 16))
  }

  insertColor(`rgb(${rgbColor.join(', ')})`)
}

const toHex = color => {
  if (color.startsWith('#')) {
    return
  }
  console.log(1)
  insertColor(color.match(/\d+/g).reduce((acc, curr) => acc + parseInt(curr, 10).toString(16), '#'))
}

const generateRandomHex = () => {
  let result = '#'
  for (let i = 0; i < 6; i++) {
    const randomDecimal = Math.floor(Math.random() * 16)
    result += randomDecimal.toString(16)
  }

  return result
}

flipBgColor()
flipButton.addEventListener('click', flipBgColor)
toRgbButton.addEventListener('click', () => toRgb(getColor()))
toHexButton.addEventListener('click', () => toHex(getColor()))
copyButton.addEventListener('click', evt => {
  navigator.clipboard.writeText(getColor())
  tooltip.classList.add('content__tooltip-copied_visible')
  setInterval(() => tooltip.classList.remove('content__tooltip-copied_visible'), 1000)
})
