import './profile.css'
import { showPopup } from '../../components/showPopup.js'
import { fetchWrapper } from '../../utils/fetchWrapper.js'
import { showConfirmOverlay } from '../../components/confirmOverlay.js'

export function renderProfilePage() {
  const app = document.querySelector('#app')
  if (!app) {
    showPopup('#app element not found')
    return
  }

  app.innerHTML = ''

  const container = document.createElement('div')
  container.className = 'profile-container'

  const header = document.createElement('h1')
  header.textContent = 'Profile Page'

  const btnContainer = document.createElement('div')
  btnContainer.className = 'btn-container'

  const updateBtn = document.createElement('button')
  updateBtn.className = 'update-btn'
  updateBtn.textContent = 'Update Account'
  updateBtn.addEventListener('click', () => {
    window.location.hash = '#/update-user'
  })

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'delete-btn'
  deleteBtn.textContent = 'Delete Account'
  deleteBtn.addEventListener('click', confirmDeleteAccount)

  btnContainer.append(updateBtn, deleteBtn)
  container.append(header, btnContainer)
  app.appendChild(container)
}
function confirmDeleteAccount() {
  showConfirmOverlay({
    message: 'Are you sure you want to delete your account?',
    confirmText: 'Yes',
    cancelText: 'No',
    onConfirm: async () => {
      try {
        const storedUser = localStorage.getItem('user')
        if (!storedUser) throw new Error('User not logged in')

        const { _id, token } = JSON.parse(storedUser)
        if (!_id || !token) throw new Error('Invalid user credentials')

        await fetchWrapper(`/users/${_id}`, {
          method: 'DELETE',
          auth: true
        })

        showPopup('Account deleted successfully')
        localStorage.removeItem('user')
        window.location.hash = '#/home'
      } catch (err) {
        showPopup('Error deleting account!')
      }
    }
  })
}
