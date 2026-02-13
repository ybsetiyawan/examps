export function getApiBase() {
  const config = useRuntimeConfig();
  return config.public.apiBase as string;
}
