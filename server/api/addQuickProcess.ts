import crypto from 'crypto'
import { createStorage } from 'unstorage'
const storage = createStorage(/* opts */)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // insert to database
  const uuid = crypto.randomUUID()
  await storage.setItem(`quick:${uuid}`, body)
  return {
    id: uuid,
  }
})
