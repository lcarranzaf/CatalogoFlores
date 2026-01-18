export const formatOrderForWhatsApp = (cart, total, customerName) => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER

  if (!phoneNumber) {
    console.error('WhatsApp number not configured')
    return null
  }

  const getTypeIcon = (type) => {
    return type === 'caja' ? '🎁' : type === 'ramo' ? '💐' : '📦'
  }

  let message = `🌸 *PEDIDO NUEVO - Catálogo Flores*\n\n`
  message += `👤 *Cliente:* ${customerName}\n\n`
  message += `📋 *Detalle del pedido:*\n`
  message += `─────────────────\n`

  cart.forEach((item, index) => {
    message += `\n${index + 1}. *${item.name}* (${getTypeIcon(item.type)})\n`
    message += `   💰 Precio: $${item.price.toFixed(2)}\n`
    message += `   📦 Cantidad: ${item.quantity}\n`
    message += `   💵 Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`
  })

  message += `\n─────────────────\n`
  message += `💵 *TOTAL A PAGAR: $${total.toFixed(2)}*\n\n`
  message += `🙏 ¡Gracias por tu pedido!\n`
  message += `📞 En breve nos pondremos en contacto contigo para confirmar.\n`

  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return whatsappUrl
}

export const formatOrderText = (cart, total, customerName) => {
  const getTypeIcon = (type) => {
    return type === 'caja' ? '🎁' : type === 'ramo' ? '💐' : '📦'
  }

  let text = `🌸 PEDIDO NUEVO - Catálogo Flores\n\n`
  text += `👤 Cliente: ${customerName}\n\n`
  text += `📋 Detalle del pedido:\n`
  text += `─────────────────\n`

  cart.forEach((item, index) => {
    text += `\n${index + 1}. ${item.name} (${getTypeIcon(item.type)})\n`
    text += `   💰 Precio: $${item.price.toFixed(2)}\n`
    text += `   📦 Cantidad: ${item.quantity}\n`
    text += `   💵 Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`
  })

  text += `\n─────────────────\n`
  text += `💵 TOTAL A PAGAR: $${total.toFixed(2)}\n\n`

  return text
}