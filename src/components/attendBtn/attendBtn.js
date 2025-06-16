import './attendBtn.css'
import { fetchWrapper } from '../../utils/fetchWrapper.js'
import { showPopup } from '../../components/showPopup.js'

export const getUser = () => {
  try {
    const stored = localStorage.getItem('user')
    if (!stored) return null
    const user = JSON.parse(stored)
    if (!user._id && user.userId) user._id = user.userId
    return user
  } catch {
    return null
  }
}

export const getUserAttendingEvents = () => {
  const user = getUser()
  return Array.isArray(user?.attending) ? user.attending : []
}

export const updateUserAttendance = (eventId, shouldAttend) => {
  const user = getUser()
  if (!user || !user._id) return

  let attending = Array.isArray(user.attending) ? [...user.attending] : []

  if (shouldAttend) {
    if (!attending.includes(eventId)) attending.push(eventId)
  } else {
    attending = attending.filter((id) => id !== eventId)
  }

  localStorage.setItem('user', JSON.stringify({ ...user, attending }))
}

export const updateButtonUI = (button, event) => {
  const user = getUser()
  if (!user || !user._id) {
    button.textContent = 'Login to Attend'
    button.disabled = false
    return
  }
  const isAttending = getUserAttendingEvents().includes(event._id)
  button.textContent = isAttending ? 'Attending ✅' : 'Attend'
  button.disabled = false
}

export const handleAttendClick = async (e, event, button) => {
  e.stopPropagation()
  const user = getUser()
  if (!user || !user._id || !user.token) {
    window.location.hash = '#/login'
    button.disabled = false
    return
  }
  const { _id: userId, token } = user
  const isAttending = getUserAttendingEvents().includes(event._id)
  const backupUser = { ...user }
  updateUserAttendance(event._id, !isAttending)
  updateButtonUI(button, event)
  try {
    const data = await fetchWrapper(`/users/${userId}`, {
      method: 'PUT',
      auth: true,
      body: {
        eventId: event._id,
        remove: isAttending
      }
    })

    const updatedAttending = Array.isArray(data.attending)
      ? data.attending
      : getUserAttendingEvents()
    localStorage.setItem(
      'user',
      JSON.stringify({ ...user, attending: updatedAttending })
    )
    updateButtonUI(button, event)
  } catch (error) {
    localStorage.setItem('user', JSON.stringify(backupUser))
    updateButtonUI(button, event)
    showPopup(`Error updating attendance`)
  }
}

export const createAttendButton = (event) => {
  const button = document.createElement('button')
  button.classList.add('im-going')
  updateButtonUI(button, event)
  button.addEventListener('click', (e) => handleAttendClick(e, event, button))
  return button
}
