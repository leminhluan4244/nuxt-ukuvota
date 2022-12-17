import { createCanvas } from 'canvas'

function randomString() {
  const chars = '123456789ABCDEFGHIJKLMNPQRSTUVWXTZabcdefghiklmnpqrstuvwxyz'
  const string_length = 4
  let randomstring = ''
  for (let i = 0; i < string_length; i++) {
    const rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rnum, rnum + 1)
  }
  return randomstring
}

function rs(val: number) {
  return val + Math.random() * (1 - val)
}
function rk(f: number) {
  return Math.random() / f
}

function getImage(color: string, rand_code: string) {
  const c = createCanvas(200, 50)
  const ctx = c.getContext('2d')

  const font_size = 30

  ctx.font = `${font_size}px Arial`
  ctx.fillStyle = color
  for (let i = 0; i < rand_code.length; i++) {
    const vk = rk(5)
    const hk = rk(5)
    ctx.setTransform(rs(0.7), vk, hk, rs(0.7), 0, 0)
    ctx.fillText(rand_code.charAt(i), font_size + i * 1.5 * font_size, font_size - font_size * (vk + hk * 2))
  }
  // Draw lines
  ctx.strokeStyle = color
  for (let i = 0; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(c.width * Math.random(), c.height * Math.random())
    ctx.lineTo(c.width * Math.random(), c.height * Math.random())
    ctx.lineWidth = font_size / 10
    ctx.stroke()
  }
  return c.toDataURL()
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const color = body.color
  const rand_code = randomString()
  return {
    img_src: getImage(color, rand_code),
  }
})
