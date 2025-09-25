const {
  PORT,
  ORIGIN,
  MONGO_URI
} = process.env

export default Object.freeze({
  port: PORT,
  origin: ORIGIN,
  mongoUri: MONGO_URI as string
})