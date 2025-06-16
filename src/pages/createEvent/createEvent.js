import './createEvent.css'
import { createBackButton } from '../../components/backBtn/backBtn.js'
import { showPopup } from '../../components/showPopup.js'
import { fetchWrapper } from '../../utils/fetchWrapper.js'

export async function renderCreateEventForm() {
  const app = document.getElementById('app')
  if (!app) return console.error('#app not found')

  app.innerHTML = ''

  const section = document.createElement('section')
  section.id = 'create-event-section'

  const backBtn = createBackButton({
    text: '← Back',
    target: '#/home',
    clearKey: 'selectedEventId'
  })
  app.appendChild(backBtn)

  const heading = document.createElement('h2')
  heading.textContent = 'Create New Event'

  const form = document.createElement('form')
  form.id = 'create-event-form'
  form.classList.add('create-event-form')

  const nameInput = document.createElement('input')
  nameInput.name = 'eventName'
  nameInput.placeholder = 'Event Name'
  nameInput.required = true

  const posterGroup = document.createElement('div')
  posterGroup.className = 'form-group'

  const posterLabel = document.createElement('label')
  posterLabel.htmlFor = 'eventPosterImg'

  const inputWrapper = document.createElement('div')
  inputWrapper.className = 'file-choose-btn'

  const fileNameDisplay = document.createElement('input')
  fileNameDisplay.type = 'text'
  fileNameDisplay.placeholder = 'Event Poster'
  fileNameDisplay.readOnly = true
  fileNameDisplay.className = 'file-name-display'

  const chooseBtn = document.createElement('span')
  chooseBtn.textContent = 'Choose File'
  chooseBtn.className = 'file-button'

  const posterInput = document.createElement('input')
  posterInput.type = 'file'
  posterInput.accept = 'image/*'
  posterInput.name = 'poster'
  posterInput.id = 'eventPosterImg'
  posterInput.style.display = 'none'

  const previewImg = document.createElement('img')
  previewImg.classList.add('preview-img')
  previewImg.alt = 'Image preview'

  const removeBtn = document.createElement('button')
  removeBtn.textContent = 'Remove Image'
  removeBtn.type = 'button'
  removeBtn.classList.add('remove-btn')

  const resetImagePreview = () => {
    posterInput.value = ''
    fileNameDisplay.value = ''
    previewImg.src = ''
    previewImg.style.display = 'none'
    removeBtn.style.display = 'none'
  }

  chooseBtn.addEventListener('click', () => posterInput.click())

  posterInput.addEventListener('change', () => {
    const file = posterInput.files[0]
    if (file) {
      fileNameDisplay.value = file.name
      const reader = new FileReader()
      reader.onload = () => {
        previewImg.src = reader.result
        previewImg.style.display = 'block'
        removeBtn.style.display = 'inline-block'
      }
      reader.readAsDataURL(file)
    } else {
      resetImagePreview()
    }
  })

  removeBtn.addEventListener('click', () => resetImagePreview())

  resetImagePreview()

  inputWrapper.appendChild(fileNameDisplay)
  inputWrapper.appendChild(chooseBtn)
  posterGroup.appendChild(posterLabel)
  posterGroup.appendChild(inputWrapper)
  posterGroup.appendChild(posterInput)
  posterGroup.appendChild(previewImg)
  posterGroup.appendChild(removeBtn)

  const dateInput = document.createElement('input')
  dateInput.name = 'date'
  dateInput.classList.add('date-input')
  dateInput.required = true
  dateInput.placeholder = 'Date'
  dateInput.type = 'text'

  flatpickr(dateInput, {
    dateFormat: 'd M',
    altInput: false,
    allowInput: true,
    disableMobile: true
  })

  const locationInput = document.createElement('input')
  locationInput.name = 'location'
  locationInput.placeholder = 'Location'
  locationInput.required = true

  const submitBtn = document.createElement('button')
  submitBtn.type = 'submit'
  submitBtn.classList.add('nav-btn')
  submitBtn.textContent = 'Create Event'

  form.append(nameInput, posterGroup, dateInput, locationInput, submitBtn)
  section.append(heading, form)
  app.appendChild(section)

  const editEventId = localStorage.getItem('editEventId')
  if (editEventId) {
    try {
      const event = await fetchWrapper(`/events/${editEventId}`, {
        auth: true
      })

      nameInput.value = event.eventName
      dateInput.value = event.date
      locationInput.value = event.location

      if (event.eventPosterImg) {
        previewImg.src = event.eventPosterImg
        previewImg.style.display = 'block'
        fileNameDisplay.value = 'Current Image'
      }

      submitBtn.textContent = 'Update Event'
      heading.textContent = 'Update Event'
    } catch (err) {
      console.error('Error loading event for editing:', err)
      showPopup('Could not load event to edit.')
    }
  }

  form.onsubmit = async (e) => {
    e.preventDefault()

    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.token || !user?._id) {
      showPopup('You must be logged in to submit.')
      return
    }

    const formData = new FormData(form)

    try {
      const saved = await fetchWrapper(
        editEventId ? `/events/${editEventId}` : '/events',
        {
          method: editEventId ? 'PUT' : 'POST',
          auth: true,
          body: formData
        }
      )

      showPopup(editEventId ? 'Event updated!' : 'Event created!')
      localStorage.removeItem('editEventId')
      window.location.hash = '#/home'
    } catch (err) {
      showPopup('Failed to submit event!')
    }
  }
}
