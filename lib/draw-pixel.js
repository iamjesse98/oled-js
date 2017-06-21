const wrapSinglePixel = require('./wrap-single-pixel')
const isPixelInBounds = require('./is-pixel-in-bounds')
const sendBytesToScreen = require('./send-bytes-to-screen')

module.exports = (pixelOrPixels, sendImmediately) => {
  const pixels = wrapSinglePixel(pixelOrPixels)
  const frameBuffer = FrameBuffer.instance
  const dirt = Dirt.instance
  pixels.forEach((pixel) => {
    if (isPixelInBounds(pixel)) {
      frameBuffer.set(pixel[0], pixel[1], pixel[2])
      dirt.markDirty(pixel[0], pixel[1])
      sendBytesToScreen(sendImmediately)
    }
  })

}
