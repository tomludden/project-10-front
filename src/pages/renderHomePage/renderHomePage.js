import './renderHomePage.css'
import { createEventCard } from '../../components/createEventCard/createEventCard.js'
import { createEventButton } from '../../components/createEventBtn/createEventBtn.js'
import { createUserHeader } from '../../components/userWelcome/userWelcome.js'
import { fetchWrapper } from '../../utils/fetchWrapper.js'
import { showPopup } from '../../components/showPopup.js'

function applyTheme(theme) {
  document.body.classList.remove('light-theme', 'dark-theme')
  document.body.classList.add(`${theme}-theme`)
  localStorage.setItem('theme', theme)
}

const savedTheme = localStorage.getItem('theme')
if (savedTheme) {
  applyTheme(savedTheme)
}

function getUserFromLocalStorage() {
  try {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error)
    return null
  }
}

export async function renderHomePage() {
  const app = document.querySelector('#app')

  app.innerHTML = ''

  const eventsWrapper = document.createElement('div')
  eventsWrapper.classList.add('events-wrapper')

  const userData = getUserFromLocalStorage()
  if (userData) {
    const userHeader = document.createElement('div')
    userHeader.classList.add('user-header')

    const createBtn = createEventButton()
    const headerInfo = createUserHeader(userData)

    userHeader.append(createBtn, headerInfo)
    eventsWrapper.appendChild(userHeader)
  }

  const title = document.createElement('h2')
  title.textContent = 'Upcoming Events'
  eventsWrapper.appendChild(title)

  try {
    const events = await fetchWrapper('/events')

    if (!Array.isArray(events) || events.length === 0) {
      const noEvents = document.createElement('p')
      noEvents.textContent = 'No events available.'
      eventsWrapper.appendChild(noEvents)
    } else {
      const cardsContainer = document.createElement('div')
      cardsContainer.classList.add('event-card-container')

      events.forEach((event) => {
        const card = createEventCard(event)
        if (card) cardsContainer.appendChild(card)
      })

      eventsWrapper.appendChild(cardsContainer)
    }
  } catch (err) {
    showPopup('Error loading events')
    console.error(err)
  }

  app.appendChild(eventsWrapper)
}
