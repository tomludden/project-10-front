import './loadingSpinner.css'

export function createSpinner() {
  if (document.getElementById('auto-spinner')) return

  const spinner = document.createElement('div')
  spinner.id = 'auto-spinner'
  spinner.setAttribute('aria-label', 'Loading spinner')
  document.body.appendChild(spinner)
}

export function showSpinner() {
  createSpinner()
  const spinner = document.getElementById('auto-spinner')
  spinner.style.display = 'block'
}

export function hideSpinner() {
  const spinner = document.getElementById('auto-spinner')
  if (spinner) spinner.style.display = 'none'
}
