export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  router.beforeEach((to, from) => {
    console.log("🔁 ROUTE CHANGE:", {
      from: from.fullPath,
      to: to.fullPath,
    });
  });
});
