import './myEvents.css'
import { createBackButton } from '../../components/backBtn/backBtn.js'
import { createEventCard } from '../../components/createEventCard/createEventCard.js'
import { fetchWrapper } from '../../utils/fetchWrapper.js'
import { showPopup } from '../../components/showPopup.js'

export const renderMyEventsPage = async () => {
  const app = document.getElementById('app')
  if (!app) return

  app.innerHTML = ''

  const userString = localStorage.getItem('user')
  if (!userString) {
    app.innerHTML = 'Please log in to see your events.'
    return
  }

  let user
  try {
    user = JSON.parse(userString)
  } catch {
    app.innerHTML = 'Error reading user data. Please log in again.'
    return
  }

  if (!user?._id) {
    app.innerHTML = 'Please log in to see your events.'
    return
  }

  const attendingEvents = user.attending || []

  const fragment = document.createDocumentFragment()
  fragment.appendChild(createBackButton())

  const title = document.createElement('h2')
  title.textContent = 'My Events'
  fragment.appendChild(title)

  try {
    const events = await fetchWrapper('/events')
    const myEvents = events.filter((event) =>
      attendingEvents.includes(event._id)
    )

    if (myEvents.length === 0) {
      const noEventsMsg = document.createElement('p')
      noEventsMsg.textContent = 'You are not attending any events yet.'
      fragment.appendChild(noEventsMsg)
    } else {
      const myEventsContainer = document.createElement('div')
      myEventsContainer.classList.add('my-events-container')
      myEvents.forEach((event) => {
        const card = createEventCard(event)
        myEventsContainer.appendChild(card)
      })
      fragment.appendChild(myEventsContainer)
    }

    app.appendChild(fragment)
  } catch (err) {
    showPopup('Could not load your events.')
  }
}
