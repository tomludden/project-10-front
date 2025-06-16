import './header.css'
import { navigateTo } from '../../utils/router.js'
import { getUser } from '../attendBtn/attendBtn.js'
import {
  insertToggleIntoDOM,
  initializeToggle
} from '../themeToggle/themeToggle.js'
import { showPopup } from '../showPopup.js'

export const Header = () => {
  let header = document.querySelector('header')
  if (!header) {
    header = document.createElement('header')
    document.body.prepend(header)
  }

  header.innerHTML = ''

  const nav = document.createElement('nav')
  nav.className = 'nav'

  const homeLink = document.createElement('a')
  homeLink.href = '#/home'
  homeLink.textContent = 'Home'

  const loginBtn = document.createElement('button')
  loginBtn.className = 'nav-btn login'
  loginBtn.id = 'login-nav-btn'

  const signUpBtn = document.createElement('button')
  signUpBtn.className = 'nav-btn signup'
  signUpBtn.id = 'signUp-nav-btn'

  nav.appendChild(homeLink)
  nav.appendChild(loginBtn)
  nav.appendChild(signUpBtn)
  header.appendChild(nav)

  insertToggleIntoDOM()
  initializeToggle()

  const storedUser = getUser()

  if (storedUser) {
    loginBtn.textContent = 'Logout'
    loginBtn.onclick = () => {
      localStorage.removeItem('user')
      showPopup('Logged out successfully')
      Header()
      navigateTo('#/home')
    }

    signUpBtn.textContent = 'My Events'
    signUpBtn.onclick = () => navigateTo('#/my-events')
  } else {
    loginBtn.textContent = 'Login'
    loginBtn.onclick = () => navigateTo('#/login')

    signUpBtn.textContent = 'Sign Up'
    signUpBtn.onclick = () => navigateTo('#/register')
  }
}
