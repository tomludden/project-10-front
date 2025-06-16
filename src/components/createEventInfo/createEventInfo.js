import './createEventInfo.css'

export function createEventInfo({ date, eventName, location }) {
  const eventInfo = document.createElement('div')
  eventInfo.classList.add('event-info')

  const eventDate = document.createElement('div')
  eventDate.classList.add('event-date')
  eventDate.textContent = date

  const eventTitleLocation = document.createElement('div')
  eventTitleLocation.classList.add('event-title-location')

  const eventTitle = document.createElement('div')
  eventTitle.classList.add('event-title')
  eventTitle.textContent = eventName

  const locationIcon = document.createElement('i')
  locationIcon.className = 'fas fa-map-marker-alt'

  const eventLocation = document.createElement('div')
  eventLocation.classList.add('event-location')
  eventLocation.textContent = location

  const locationWithIcon = document.createElement('div')
  locationWithIcon.classList.add('event-location-with-icon')
  locationWithIcon.append(locationIcon, eventLocation)

  eventTitleLocation.append(eventTitle, locationWithIcon)
  eventInfo.append(eventDate, eventTitleLocation)

  return eventInfo
}
