import './style.css'
import { Header } from './src/components/header/header.js'
import { handleRoute } from './src/utils/routes.js'

document.addEventListener('DOMContentLoaded', () => {
  Header()
  handleRoute()
})

window.addEventListener('hashchange', () => {
  Header()
  handleRoute()
})
