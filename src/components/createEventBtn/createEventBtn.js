import './createEventBtn.css'
import { navigateTo } from '../../utils/router.js'

export function createEventButton() {
  const btn = document.createElement('button')
  btn.textContent = '➕'
  btn.classList.add('create-event-btn')
  btn.onclick = () => {
    localStorage.removeItem('editEventId')
    navigateTo('#/create-event')
  }
  return btn
}
