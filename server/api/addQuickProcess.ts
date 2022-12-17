import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // insert to database
  const uuid = crypto.randomUUID()
  await useStorage().setItem(`quick:${uuid}`, body)
  return {
    id: uuid,
  }
})
