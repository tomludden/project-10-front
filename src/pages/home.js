import { renderHomePage } from '../pages/renderHomePage/renderHomePage.js'

export const applyTheme = (theme) => {
  const finalTheme = validThemes.includes(theme) ? theme : 'light'

  document.body.classList.remove('light-theme', 'dark-theme')
  document.body.classList.add(`${finalTheme}-theme`)
  localStorage.setItem('theme', finalTheme)
}

const savedTheme = localStorage.getItem('theme') || 'light'
applyTheme(savedTheme)

renderHomePage()
