const td = require('testdouble')
const assert = require('assert')

const FrameBuffer = require('../../lib/value/frame-buffer')
const Dirt = require('../../lib/value/dirt')

let subject, wrapSinglePixel, isPixelInBounds, sendBytesToScreen
module.exports = {
  beforeEach: () => {
    FrameBuffer.init(30,30)

    wrapSinglePixel = td.replace('../../lib/wrap-single-pixel')
    isPixelInBounds = td.replace('../../lib/is-pixel-in-bounds')
    sendBytesToScreen = td.replace('../../lib/send-bytes-to-screen')
    subject = require('../../lib/draw-pixel')
  },
  afterEach: () => {
    FrameBuffer.reset()
    Dirt.reset()
  },
  'draws pixels i guess': () => {
    td.when(wrapSinglePixel('fake pixels')).thenReturn([[1,1,33], [100,100,66]])
    td.when(isPixelInBounds([1,1,33])).thenReturn(true)
    td.when(isPixelInBounds([100,100,66])).thenReturn(false)

    subject('fake pixels', 'whether to set immediate')

    td.verify(sendBytesToScreen('whether to set immediate'))
    assert.equal(Dirt.instance.isDirty(1,1), true)
    assert.equal(Dirt.instance.isDirty(100,100), false)
    assert.equal(FrameBuffer.instance.colorAt(1,1), 33)
    assert.equal(FrameBuffer.instance.colorAt(100,100), 0)
  }
}
