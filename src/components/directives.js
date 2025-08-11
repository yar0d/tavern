export default function (Vue) {
  /*
  * Directive v-long-press
  *
  * Add this directive to repeat the click event when the mouse button is held down.
  */
  Vue.directive("long-press", {
    mounted (el, binding, vNode) {
      // Make sure expression provided is a function
      if (typeof binding.value !== "function") {
        // Fetch name of component
        const compName = vNode.context.name
        // pass warning to console
        let warn = `[long-press] provided expression '${binding.expression}' is not a function, but has to be`
        if (compName) {
          warn += `Found in component '${compName}' `
        }

        console.warn(warn)
      }

      // Define variable
      let pressTimer = null
      let pressInterval = null
      const delay = 400
      const interval = 50

      // Cancel Timeout
      const cancel = () => {
        if (pressTimer !== null) {
          clearTimeout(pressTimer)
          pressTimer = null
        }
        if (pressInterval) {
          clearInterval(pressInterval)
          pressInterval = null
        }
      }

      // Run Function
      const handler = (e) => {
        // if element become disabled, it will not receive event that cancel, so do it ourself
        if (el && el.hasAttribute("disabled"))
          cancel()
        else binding.value(e)
      }

      // Define function handlers
      // Create timeout ( run function after delay )
      const start = (e) => {
        if (e.type === "click" && e.button !== 0) {
          return
        }

        if (pressTimer === null) {
          pressTimer = setTimeout(() => {
            if (interval && interval > 0) {
              pressInterval = setInterval(() => {
                handler()
              }, interval)
            }
            handler()
          }, delay)
        }
      }

      // Add Event listeners
      el.addEventListener("mousedown", start)
      el.addEventListener("touchstart", start)
      // Cancel timeouts if this events happen
      el.addEventListener("click", cancel)
      el.addEventListener("mouseout", cancel)
      el.addEventListener("touchend", cancel)
      el.addEventListener("touchcancel", cancel)
    },
  })
}
