const customDrawLabel = function (context, data, settings) {
  if (!data.label) return

  const size = settings.labelSize,
    font = settings.labelFont,
    weight = settings.labelWeight,
    color = settings.labelColor.attribute
      ? data[settings.labelColor.attribute] ||
        settings.labelColor.color ||
        '#000'
      : settings.labelColor.color

  context.fillStyle = color
  context.font = `${weight} ${size}px ${font}`

  context.fillText(data.label, data.x + data.size + 3, data.y + size / 3)
}

const customDrawHover = function (context, data, settings) {
  const size = settings.labelSize,
    font = settings.labelFont,
    weight = settings.labelWeight

  context.font = `${weight} ${size}px ${font}`

  // Then we draw the label background
  context.fillStyle = settings.labelHoverColor || '#FFF'
  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
  context.shadowBlur = 8
  context.shadowColor = settings.labelShadowColor || '#000'

  const PADDING = 2

  if (typeof data.label === 'string') {
    const textWidth = context.measureText(data.label).width,
      boxWidth = Math.round(textWidth + 5),
      boxHeight = Math.round(size + 2 * PADDING),
      radius = Math.max(data.size, size / 2) + PADDING

    const angleRadian = Math.asin(boxHeight / 2 / radius)
    const xDeltaCoord = Math.sqrt(
      Math.abs(Math.pow(radius, 2) - Math.pow(boxHeight / 2, 2))
    )

    context.beginPath()
    context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2)
    context.lineTo(data.x + radius + boxWidth, data.y + boxHeight / 2)
    context.lineTo(data.x + radius + boxWidth, data.y - boxHeight / 2)
    context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2)
    context.arc(data.x, data.y, radius, angleRadian, -angleRadian)
    context.closePath()
    context.fill()
  } else {
    context.beginPath()
    context.arc(data.x, data.y, data.size + PADDING, 0, Math.PI * 2)
    context.closePath()
    context.fill()
  }

  context.shadowOffsetX = 0
  context.shadowOffsetY = 0
  context.shadowBlur = 0

  // And finally we draw the label
  customDrawLabel(context, data, settings)
}
