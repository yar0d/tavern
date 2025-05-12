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

export const useNotifyStore = defineStore("notify", {
  state: () => ({
    notifications: [],
    notificationsArchive: [],
  }),
  actions: {
    notify (messageOrError, type = NOTIFICATION_TYPE_INFO, duration = 5000){
      let message = ""
      if (messageOrError instanceof Error) message = messageOrError.message
      if (typeof messageOrError === "string") message = messageOrError
      const notification = {message, type, notifyTime: Date.now()}
      this.notifications.push(notification)
      if (duration > 0) setTimeout(this.removeNotification.bind(this), duration, notification)
    },
    removeNotification (notification){
      this.notifications = this.notifications.filter(n => n.notifyTime != notification.notifyTime)
    },
  },
})

export default useNotifyStore
