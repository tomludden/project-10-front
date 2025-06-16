export function showConfirmOverlay({
  message = 'Are you sure you want to delete your account?',
  onConfirm = () => {},
  onCancel = () => {},
  confirmText = 'Yes',
  cancelText = 'No'
} = {}) {
  const overlay = document.createElement('div')
  overlay.className = 'overlay'

  const confirmBox = document.createElement('div')
  confirmBox.className = 'confirm-box'

  const msg = document.createElement('p')
  msg.textContent = message

  const btnYes = document.createElement('button')
  btnYes.className = 'confirm-yes'
  btnYes.textContent = confirmText
  btnYes.addEventListener('click', async () => {
    await onConfirm()
    overlay.remove()
  })

  const btnNo = document.createElement('button')
  btnNo.className = 'confirm-no'
  btnNo.textContent = cancelText
  btnNo.addEventListener('click', () => {
    onCancel()
    overlay.remove()
  })

  confirmBox.append(msg, btnYes, btnNo)
  overlay.appendChild(confirmBox)
  document.body.appendChild(overlay)
}
