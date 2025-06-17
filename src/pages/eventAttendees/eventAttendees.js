import './eventAttendees.css'
import { createBackButton } from '../../components/backBtn/backBtn.js'
import { fetchWrapper } from '../../utils/fetchWrapper.js'
import { showPopup } from '../../components/showPopup.js'

export async function renderEventAttendees(app, event) {
  app.innerHTML = ''

  const container = document.createElement('div')
  container.classList.add('event-attendees-container')

  const backBtn = createBackButton()
  container.appendChild(backBtn)

  const title = document.createElement('h2')
  title.textContent = event.eventName
  title.classList.add('attending-event-title')

  const attendeesTitle = document.createElement('h3')
  attendeesTitle.textContent = 'Attendees'
  attendeesTitle.classList.add('attendees-title')

  const list = document.createElement('div')
  list.classList.add('attendee-list')

  container.append(title, attendeesTitle, list)
  app.appendChild(container)

  if (!event.attending || event.attending.length === 0) {
    const emptyMsg = document.createElement('p')
    emptyMsg.textContent = 'No attendees yet.'
    list.appendChild(emptyMsg)
    return
  }

  try {
    const token = JSON.parse(localStorage.getItem('user'))?.token || ''

    const avatarPromises = event.attending.map(async (user) => {
      const card = document.createElement('div')
      card.classList.add('attendee-card')

      const avatar = document.createElement('img')
      avatar.src = user.avatar || '/assets/images/default-avatar-2.png'
      avatar.alt = `${user.userName || 'User'}'s avatar`
      avatar.classList.add('attendee-avatar')
      avatar.onerror = () => {
        avatar.src = '/assets/images/default-avatar-2.png'
      }

      const name = document.createElement('span')
      name.textContent = user.userName || 'Unnamed'
      name.classList.add('attendee-name')

      card.append(avatar, name)
      list.appendChild(card)

      if (!user._id) return

      try {
        const fullUser = await fetchWrapper(
          `/users/${encodeURIComponent(user._id)}`,
          {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        )
        if (fullUser?.avatar) avatar.src = fullUser.avatar
      } catch (err) {
        console.error('Error fetching user avatar:', err)
      }
    })

    await Promise.all(avatarPromises)
  } catch (err) {
    showPopup(`Error loading attendees`)
  }
}
