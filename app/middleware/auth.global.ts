export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUser();
  const { data: res } = await useFetch("/api/auth/session");
  const data = res.value;
  if (data) {
    user.value = data;
  }
  const currentRoute = to.fullPath;

  if (!data && currentRoute.includes("/dashboard")) {
    return navigateTo("/login");
  }

  if (data && currentRoute === "/login") {
    return navigateTo("/dashboard");
  }
});
