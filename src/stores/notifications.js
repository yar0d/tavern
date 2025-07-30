import { defineStore } from "pinia"

export const NOTIFICATION_TYPE_INFO = 1
export const NOTIFICATION_TYPE_SUCCESS = 2
export const NOTIFICATION_TYPE_WARNING = 3
export const NOTIFICATION_TYPE_ERROR = 4

export const NOTIFICATION_CLASSES = {
  [NOTIFICATION_TYPE_INFO]: "alert alert-info",
  [NOTIFICATION_TYPE_SUCCESS]: "alert alert-success",
  [NOTIFICATION_TYPE_WARNING]: "alert alert-warning",
  [NOTIFICATION_TYPE_ERROR]: "alert alert-error",
}

export const NOTIFICATION_DURATION = 5 // seconds
export const NOTIFICATION_DURATION_MANUAL_CLOSE = 0

export const useNotifyStore = defineStore("notify", {
  state: () => ({
    notifications: [],
    notificationsArchive: [],
  }),
  actions: {
    error (messageOrError) {
      this.notify(messageOrError, NOTIFICATION_TYPE_ERROR, NOTIFICATION_DURATION_MANUAL_CLOSE)
    },
    info (messageOrError) {
      this.notify(messageOrError, NOTIFICATION_TYPE_INFO, NOTIFICATION_DURATION)
    },
    notify (messageOrError, type = NOTIFICATION_TYPE_INFO, duration = NOTIFICATION_DURATION){
      let message = ""
      if (messageOrError instanceof Error) message = messageOrError.message
      if (typeof messageOrError === "string") message = messageOrError
      const notification = {message, type, notifyTime: Date.now()}
      this.notifications.push(notification)
      if (duration > 0) setTimeout(this.removeNotification.bind(this), duration * 1000, notification)
    },
    removeNotification (notification){
      this.notifications = this.notifications.filter(n => n.notifyTime != notification.notifyTime)
    },
    success (messageOrError) {
      this.notify(messageOrError, NOTIFICATION_TYPE_SUCCESS, NOTIFICATION_DURATION)
    },
    warning (messageOrError) {
      this.notify(messageOrError, NOTIFICATION_TYPE_WARNING, NOTIFICATION_DURATION)
    },
  },
})

export default useNotifyStore
