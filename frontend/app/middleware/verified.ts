export default defineNuxtRouteMiddleware((to) => {
  const user = useUser()

  if (user.value?.email_verified === false) {
    return navigateTo('/')
  }
})