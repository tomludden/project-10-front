/* import './vite-project/style.css' */
import './createEventCard.css'
import { createDeleteUpdateMenu } from '../deleteUpdateMenu/deleteUpdateMenu.js'
import { createAttendButton } from '../attendBtn/attendBtn.js'
import { createEventInfo } from '../createEventInfo/createEventInfo.js'

export function createEventCard(event) {
  if (!event) return document.createTextNode('Invalid event')

  const eventCard = document.createElement('div')
  eventCard.classList.add('event-card')

  const tooltip = document.createElement('div')
  tooltip.classList.add('event-card-tooltip')
  tooltip.textContent = "Click to see who's going"
  eventCard.appendChild(tooltip)

  const eventImage = document.createElement('img')
  eventImage.src = event?.eventPosterImg || 'https://picsum.photos/200/300'
  eventImage.alt = 'Event Poster'
  eventCard.appendChild(eventImage)

  const eventInfoCombined = createEventInfo({
    date: event.date,
    eventName: event.eventName,
    location: event.location
  })
  eventCard.appendChild(eventInfoCombined)

  const attendButton = createAttendButton(event)
  eventCard.appendChild(attendButton)

  const menu = createDeleteUpdateMenu(event, eventCard)
  if (menu) eventCard.appendChild(menu)

  eventCard.addEventListener('click', () => {
    localStorage.setItem('selectedEventId', event._id)
    window.location.hash = '#/attending'
  })

  return eventCard
}
