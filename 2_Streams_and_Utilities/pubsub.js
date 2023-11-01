const events = {}

module.exports = {
  publish(eventName, param) {
    if (events[eventName]) {
      events[eventName].forEach((callback) => {
        console.log(`Starting ${callback.name} callback`)
        callback(param)
      })
    }
  },

  subscribe(eventName, callback) {
    events[eventName] = events[eventName] || []
    events[eventName].push(callback)
    console.log(`Callback ${callback.name} added`)
  }
}
