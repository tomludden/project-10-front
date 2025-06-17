import './userWelcome.css'

export function createUserHeader(userData) {
  const container = document.createElement('div')
  container.classList.add('user-header')

  const avatar = document.createElement('img')
  avatar.src =
    userData.avatar || 'vite-project/public/assets/images/default-avatar-2.png'
  avatar.alt = 'User Avatar'
  avatar.classList.add('welcome-avatar-img')

  const welcome = document.createElement('div')
  welcome.classList.add('welcome-message')

  const line1 = document.createElement('div')
  line1.textContent = 'Welcome'

  const line2 = document.createElement('div')
  line2.textContent = userData.userName || 'User'

  welcome.appendChild(line1)
  welcome.appendChild(line2)

  container.appendChild(avatar)
  container.appendChild(welcome)

  container.addEventListener('click', () => {
    window.location.hash = '#/profile'
  })

  return container
}
