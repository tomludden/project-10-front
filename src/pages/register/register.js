import './register.css'
import { navigateTo } from '../../utils/router'
import { showPopup } from '../../components/showPopup'
import { fetchWrapper } from '../../utils/fetchWrapper'

const params = Object.fromEntries(new URLSearchParams(window.location.search))
const isUpdate = params.update === 'true'
const { userId, userName, email, avatar } = params

export function renderRegisterUI() {
  const app = document.querySelector('#app')
  if (!app) return

  app.innerHTML = ''

  const section = document.createElement('section')
  section.id = 'register'

  const form = document.createElement('form')
  form.id = 'form'

  const title = document.createElement('h1')
  title.id = 'register-title'
  title.textContent = isUpdate ? 'Update Account' : 'Register'

  const usernameInput = document.createElement('input')
  usernameInput.type = 'text'
  usernameInput.placeholder = 'Username'
  usernameInput.id = 'userName'
  usernameInput.required = true

  const emailInput = document.createElement('input')
  emailInput.type = 'email'
  emailInput.placeholder = 'Email'
  emailInput.id = 'email'
  emailInput.required = true

  const passwordInput = document.createElement('input')
  passwordInput.type = 'password'
  passwordInput.placeholder = isUpdate ? 'New Password (Optional)' : 'Password'
  passwordInput.id = 'password'

  const avatarLabel = document.createElement('label')
  avatarLabel.htmlFor = 'avatar'
  avatarLabel.textContent = 'Upload Avatar (optional)'

  const avatarInput = document.createElement('input')
  avatarInput.type = 'file'
  avatarInput.id = 'avatar'
  avatarInput.accept = 'image/*'

  const avatarPreview = document.createElement('img')
  avatarPreview.id = 'avatar-preview'
  avatarPreview.src = avatar || '../../assets/images/default-avatar-2.png'
  avatarPreview.alt = 'Avatar preview'
  avatarPreview.classList.add('avatar-img')

  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      avatarPreview.src = objectUrl
      avatarPreview.onload = () => URL.revokeObjectURL(objectUrl)
    }
  })

  const submitBtn = document.createElement('button')
  submitBtn.id = 'registerbtn'
  submitBtn.type = 'submit'
  submitBtn.textContent = isUpdate ? 'Update' : 'Register'

  form.append(
    title,
    usernameInput,
    emailInput,
    passwordInput,
    avatarLabel,
    avatarInput,
    avatarPreview,
    submitBtn
  )
  section.appendChild(form)
  app.appendChild(section)

  if (isUpdate) {
    usernameInput.value = userName
    emailInput.value = email
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    await handleFormSubmit({
      userName: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      avatarFile: avatarInput.files[0],
      isUpdate,
      userId
    })
  })
}

async function handleFormSubmit({
  userName,
  email,
  password,
  avatarFile,
  isUpdate,
  userId
}) {
  try {
    const formData = new FormData()
    formData.append('userName', userName)
    formData.append('email', email)
    if (password) formData.append('password', password)
    if (avatarFile) formData.append('avatar', avatarFile)

    const endpoint = isUpdate ? `/users/${userId}` : '/users/register'
    const method = isUpdate ? 'PUT' : 'POST'

    const data = await fetchWrapper(endpoint, {
      method,
      body: formData,
      headers: {}
    })

    const userPayload = { ...data.user, token: data.token }
    localStorage.setItem('user', JSON.stringify(userPayload))

    showPopup(
      isUpdate
        ? 'Profile updated successfully!'
        : 'Account created and logged in!'
    )
    navigateTo('#/home')
  } catch (error) {
    showPopup('Error')
  }
}
