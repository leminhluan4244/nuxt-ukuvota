export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // insert to database
  const uuid = body.id

  const data = await useStorage().getItem(`quick:${uuid}`)
  if (data === null)
    return -1
  else
    return data
})
