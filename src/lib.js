const storageKey = 'freelancer:settings'

export const loadSettingsFromStorage = () => {
  try {
    const b64 = window.localStorage.getItem(storageKey)
    return JSON.parse(atob(b64))
  } catch (error) {
    console.error('Error loading settings:', error)
    return null
  }
}

export const saveSettingsToStorage = settings => {
  console.log(settings)
  console.log(JSON.stringify(settings))
  const b64 = btoa(JSON.stringify(settings))
  window.localStorage.setItem(storageKey, b64)
}
