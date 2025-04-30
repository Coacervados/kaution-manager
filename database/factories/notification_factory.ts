import factory from '@adonisjs/lucid/factories'
import Notification from '#models/notification'

export const NotificationFactory = factory
  .define(Notification, async ({ faker }) => {
    return {}
  })
  .build()