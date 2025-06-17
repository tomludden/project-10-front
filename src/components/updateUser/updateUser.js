import './updateUser.css'
import { navigateTo } from '../../utils/router.js'
import { getUser, getUserAttendingEvents } from '../attendBtn/attendBtn.js'
import { showPopup } from '../../components/showPopup.js'
import { fetchWrapper } from '../../utils/fetchWrapper.js'

export function renderUpdateProfilePage() {
  const app = document.querySelector('#app')
  if (!app) {
    showPopup('#app element not found')
    return
  }

  const user = getUser()
  if (!user) {
    navigateTo('#/login')
    return
  }

  const attending = getUserAttendingEvents()
  app.innerHTML = ''

  const section = document.createElement('section')
  section.id = 'register'

  const form = document.createElement('form')
  form.id = 'update-form'

  const title = document.createElement('h1')
  title.id = 'register-title'
  title.textContent = 'Update Account'

  const usernameInput = document.createElement('input')
  usernameInput.type = 'text'
  usernameInput.placeholder = 'Username'
  usernameInput.id = 'userName'
  usernameInput.required = true
  usernameInput.value = user.userName || ''

  const emailInput = document.createElement('input')
  emailInput.type = 'email'
  emailInput.placeholder = 'Email'
  emailInput.id = 'email'
  emailInput.required = true
  emailInput.value = user.email || ''

  const passwordInput = document.createElement('input')
  passwordInput.type = 'password'
  passwordInput.placeholder = 'New Password (Optional)'
  passwordInput.id = 'password'

  const avatarLabel = document.createElement('label')
  avatarLabel.htmlFor = 'avatar'
  avatarLabel.textContent = 'Change Avatar (optional)'

  const avatarInput = document.createElement('input')
  avatarInput.type = 'file'
  avatarInput.id = 'avatar'
  avatarInput.accept = 'image/*'

  const avatarPreview = document.createElement('img')
  avatarPreview.id = 'avatar-preview'
  avatarPreview.classList.add('update-avatar-img')
  avatarPreview.alt = 'Avatar preview'
  avatarPreview.src = user.avatar || '/assets/images/default-avatar-2.png'

  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0]
    if (file) {
      avatarPreview.src = URL.createObjectURL(file)
    }
  })

  const submitBtn = document.createElement('button')
  submitBtn.id = 'updatebtn'
  submitBtn.type = 'submit'
  submitBtn.textContent = 'Update'

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    await handleProfileUpdate({
      userName: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      avatarFile: avatarInput.files[0],
      userId: user._id,
      token: user.token,
      attending: attending
    })
  })
}

async function handleProfileUpdate({
  userName,
  email,
  password,
  avatarFile,
  userId,
  token
}) {
  try {
    const formData = new FormData()
    formData.append('userName', userName)
    formData.append('email', email)
    if (password) formData.append('password', password)
    if (avatarFile) formData.append('avatar', avatarFile)

    const data = await fetchWrapper(`/users/${userId}`, formData, {
      Authorization: `Bearer ${token}`
    })

    const updatedUser = { ...data.user, token: data.token }
    localStorage.setItem('user', JSON.stringify(updatedUser))

    if (updatedUser.avatar) {
      window.location.reload()
      return
    }

    showPopup('Profile updated successfully!')
  } catch (error) {
    showPopup(`Error updating profile!`)
    navigateTo('#/home')
  }
}
