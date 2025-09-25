const {
  PORT,
  ORIGIN,
  MONGO_URI,
  SECRET_ACCESS_TOKEN,
  SECRET_REFRESH_TOKEN,
} = process.env

export default Object.freeze({
  port: PORT,
  origin: ORIGIN,
  mongoUri: MONGO_URI as string,
  
  token: {
    access: {
      secret: SECRET_ACCESS_TOKEN as string,
      duration: [15, 'h']
    },

    refresh: {
      secret: SECRET_REFRESH_TOKEN as string,
      duration: [20, 'd']
    },
  }
})