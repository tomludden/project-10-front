import './themeToggle.css'

export function insertToggleIntoDOM() {
  const header = document.querySelector('header')
  if (!header) {
    console.error('Header not found')
    return
  }

  const container = document.createElement('div')
  container.className = 'toggle-container'
  const toggle = document.createElement('div')
  toggle.classList.add('toggle')

  const knob = document.createElement('div')
  knob.classList.add('knob')

  const icon = document.createElement('i')
  icon.classList.add('icon', 'far', 'fa-sun')

  knob.appendChild(icon)
  toggle.appendChild(knob)
  container.appendChild(toggle)

  header.appendChild(container)
}
export function initializeToggle() {
  const toggle = document.querySelector('.toggle')
  const icon = document.querySelector('.icon')

  if (!toggle || !icon) {
    console.warn('Toggle not found')
    return
  }

  const savedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')

  if (initialTheme === 'dark') {
    document.body.classList.add('dark-theme')
    toggle.classList.add('active')
    icon.className = 'icon far fa-moon'
  } else {
    document.body.classList.add('light-theme')
    toggle.classList.remove('active')
    icon.className = 'icon far fa-sun'
  }

  toggle.addEventListener('click', () => {
    const isDark = toggle.classList.toggle('active')
    const newTheme = isDark ? 'dark' : 'light'

    document.body.classList.remove('dark-theme', 'light-theme')
    document.body.classList.add(`${newTheme}-theme`)
    localStorage.setItem('theme', newTheme)

    icon.className = `icon far fa-${newTheme === 'dark' ? 'moon' : 'sun'}`
  })
}

insertToggleIntoDOM()
initializeToggle()
