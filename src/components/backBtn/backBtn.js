import './backBtn.css'

import { navigateTo } from '../../utils/router.js'

export function createBackButton({
  text = '← Back',
  target = '#/home',
  clearKey = null
} = {}) {
  const backBtn = document.createElement('button')
  backBtn.textContent = text
  backBtn.classList.add('back-btn')

  backBtn.onclick = () => {
    if (clearKey) localStorage.removeItem(clearKey)
    navigateTo(target)
  }

  return backBtn
}
