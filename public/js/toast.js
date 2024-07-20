export function showSuccessToast(message, duration = 5000) {
  showToast('success', message, duration);
}

export function showErrorToast(message, duration = 5000) {
  showToast('error', message, duration);
}

export function showToast(type, message, duration) {
  const toast = document.getElementById('toast');
  // Display the toast message
  toast.textContent = message;
  toast.style.display = 'block';

  if (type == 'error') {
    toast.style.backgroundColor = "red";
  }

  if (type == 'success') {
    toast.style.backgroundColor = "green";
  }

  // Hide the toast message after the specified duration
  setTimeout(() => {
    toast.style.display = 'none';
  }, duration);
}