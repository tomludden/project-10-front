import './login.css'
import { renderHomePage } from '../../pages/renderHomePage/renderHomePage.js'
import { showPopup } from '../../components/showPopup.js'
import { fetchWrapper } from '../../utils/fetchWrapper.js'
import { Header } from '../../components/header/header.js'

export const renderLoginUI = () => {
  const app = document.getElementById('app')
  if (!app) return console.error('#app not found')

  app.innerHTML = ''

  const loginSection = document.createElement('section')
  loginSection.id = 'login'

  const form = document.createElement('form')
  form.id = 'loginForm'

  const usernameInput = document.createElement('input')
  usernameInput.type = 'text'
  usernameInput.placeholder = 'Username'
  usernameInput.id = 'username'
  usernameInput.required = true

  const passwordInput = document.createElement('input')
  passwordInput.type = 'password'
  passwordInput.placeholder = 'Password'
  passwordInput.id = 'password'
  passwordInput.required = true

  const loginBtn = document.createElement('button')
  loginBtn.type = 'submit'
  loginBtn.id = 'loginbtn'
  loginBtn.textContent = 'Login'

  form.append(usernameInput, passwordInput, loginBtn)
  form.addEventListener('submit', loginSubmit)

  loginSection.appendChild(form)
  app.appendChild(loginSection)
}

const loginSubmit = async (ev) => {
  ev.preventDefault()

  const userName = document.getElementById('username')?.value.trim()
  const password = document.getElementById('password')?.value

  if (!userName || !password) {
    showPopup('Username and password are required')
    return
  }

  try {
    const data = await fetchWrapper('/users/login', {
      method: 'POST',
      body: { userName, password }
    })

    localStorage.setItem(
      'user',
      JSON.stringify({
        _id: data.user._id,
        userName: data.user.userName,
        email: data.user.email,
        avatar: data.user.avatar,
        attending: data.user.attending || [],
        token: data.token
      })
    )

    showPopup('Logged in successfully')
    Header()
    renderHomePage()
  } catch (err) {
    console.error('Login error:', err)
    showPopup('Login error..Check your username or password')
  }
}
