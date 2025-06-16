import { renderHomePage } from '../../src/pages/renderHomePage/renderHomePage.js'
import { renderProfilePage } from '../pages/profile/profile.js'
import { renderMyEventsPage } from '../pages/myEvents/myEvents.js'
import { renderCreateEventForm } from '../pages/createEvent/createEvent.js'
import { renderEventAttendees } from '../pages/eventAttendees/eventAttendees.js'
import { renderRegisterUI } from '../pages/register/register.js'
import { renderLoginUI } from '../pages/login/login.js'
import { renderUpdateProfilePage } from '../components/updateUser/updateUser.js'
import {
  showSpinner,
  hideSpinner
} from '../components/loadingSpinner/loadingSpinner.js'
import { fetchWrapper } from './fetchWrapper.js'
import { showPopup } from '../components/showPopup.js'

export const routes = [
  { path: '#/home', label: 'Home', render: renderHomePage, navType: 'link' },
  {
    path: '#/login',
    label: 'Login',
    render: renderLoginUI,
    navType: 'button',
    id: 'login-nav-btn'
  },
  { path: '#/create-event', render: renderCreateEventForm },
  {
    path: '#/register',
    label: 'Sign Up',
    render: renderRegisterUI,
    navType: 'button',
    id: 'signUp-nav-btn'
  },
  {
    path: '#/profile',
    label: 'Profile',
    render: renderProfilePage,
    navType: 'button'
  },
  { path: '#/my-events', label: 'My Events', render: renderMyEventsPage },
  { path: '#/attending', render: renderEventAttendees },
  { path: '#/update-user', render: renderUpdateProfilePage }
]

export async function handleRoute() {
  window.scrollTo(0, 0)
  const app = document.querySelector('#app')
  if (!app) {
    showPopup('#app container not found')
    return
  }
  showSpinner()
  try {
    const currentHash = window.location.hash || '#/home'
    const route = routes.find((r) => r.path === currentHash)
    const renderFn = route?.render || renderHomePage
    app.innerHTML = ''
    if (currentHash === '#/attending') {
      const eventId = localStorage.getItem('selectedEventId')
      if (eventId) {
        try {
          const event = await fetchWrapper(`/events/${eventId}`)
          await renderEventAttendees(app, event)
          return
        } catch (err) {
          showPopup('Error loading event.')
          console.error(err)
          return
        }
      }
    }
    await renderFn(app)
  } catch (err) {
    showPopup('Error during route handling.')
    console.error(err)
  } finally {
    hideSpinner()
  }
}
