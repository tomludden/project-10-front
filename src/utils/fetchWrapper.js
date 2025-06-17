import {
  showSpinner,
  hideSpinner
} from '../components/loadingSpinner/loadingSpinner.js'

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

function buildUrl(endpoint) {
  return endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`
}

export async function fetchWrapper(
  endpoint,
  {
    method = 'GET',
    headers = {},
    body = null,
    auth = false,
    showLoading = true
  } = {}
) {
  const url = buildUrl(endpoint)

  if (auth) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user?.token) {
      throw new Error('No token provided')
    }
    headers['Authorization'] = `Bearer ${user.token}`
  }

  const isFormData = body instanceof FormData

  const fetchOptions = {
    method,
    headers: isFormData
      ? headers
      : {
          'Content-Type': 'application/json',
          ...headers
        }
  }

  if (method !== 'GET' && method !== 'HEAD' && body !== null) {
    fetchOptions.body = isFormData ? body : JSON.stringify(body)
  }

  if (showLoading) showSpinner()

  try {
    const response = await fetch(url, fetchOptions)

    const contentType = response.headers.get('content-type') || ''
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}\n${errorText}`)
    }

    return contentType.includes('application/json')
      ? await response.json()
      : await response.text()
  } catch (err) {
    console.error('fetchWrapper error:', err)
    throw err
  } finally {
    if (showLoading) hideSpinner()
  }
}
