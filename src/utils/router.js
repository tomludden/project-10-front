export function navigateTo(route) {
  if (window.location.hash !== route) {
    window.location.hash = route
  }
}
