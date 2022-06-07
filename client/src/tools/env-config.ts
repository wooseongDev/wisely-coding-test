type EnvConfig = {
  API_ORIGIN: string
}

export const envConfig: EnvConfig = {
  API_ORIGIN: import.meta.env.VITE_API_ORIGIN,
}
