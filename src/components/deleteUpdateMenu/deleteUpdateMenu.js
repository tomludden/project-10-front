import './deleteUpdateMenu.css'
import { fetchWrapper } from '../../utils/fetchWrapper.js'
import { showPopup } from '../../components/showPopup.js'
import { showConfirmOverlay } from '../confirmOverlay.js'

export function createDeleteUpdateMenu(event, eventCard) {
  const userDataRaw = localStorage.getItem('user')
  if (!userDataRaw) return null

  let userData
  try {
    userData = JSON.parse(userDataRaw)
  } catch {
    return null
  }

  const { _id: currentUserId, token } = userData
  if (!token || !currentUserId || event.createdBy !== currentUserId) return null

  const menuWrapper = document.createElement('div')
  menuWrapper.classList.add('event-card-menu-wrapper')

  const menuButton = document.createElement('button')
  menuButton.classList.add('menu-button')
  menuButton.textContent = '⋮'

  const menuDropdown = document.createElement('div')
  menuDropdown.classList.add('menu-dropdown', 'hidden')

  const toggleDropdown = () => menuDropdown.classList.toggle('hidden')
  const hideDropdown = () => menuDropdown.classList.add('hidden')

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete-event')
  deleteButton.textContent = '🗑️ Delete'
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation()
    hideDropdown()

    showConfirmOverlay({
      message: 'Are you sure you want to delete this event?',
      confirmText: 'Delete',
      cancelText: 'No',
      onConfirm: async () => {
        try {
          await fetchWrapper(`/events/${event._id}`, {
            method: 'DELETE',
            auth: true
          })
          showPopup('Event deleted!')
          window.location.reload()
        } catch (err) {
          showPopup('Failed to delete event!')
        }
      }
    })
  })

  const updateButton = document.createElement('button')
  updateButton.classList.add('update-event')
  updateButton.textContent = '✏️ Update'
  updateButton.addEventListener('click', (e) => {
    e.stopPropagation()
    hideDropdown()
    localStorage.setItem('editEventId', event._id)
    window.location.hash = '#/create-event'
  })

  menuDropdown.append(updateButton, deleteButton)
  menuWrapper.append(menuButton, menuDropdown)
  eventCard.appendChild(menuWrapper)

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation()
    toggleDropdown()
  })

  document.addEventListener('click', () => hideDropdown())

  return menuWrapper
}
