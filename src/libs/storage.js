/**
 * Local storage facility
 * @class localStorage
 * @namespace services
 */

const storage = window.localStorage
const ls = {}

/**
 * Store a key with its value in local storage.
 * @method set
 * @param {string} key   The key to set.
 * @param {Mixed}  value The value that will be stored.
 */
ls.set = (key, value) => {
  value = JSON.stringify(value)
  storage.setItem(key, value)
}

/**
 * Retrieve the value of a key from local storage.
 * @method get
 * @param  {string} key          The key to get.
 * @param  {Miked}  defaultValue The value that will be returned if no value is found in local storage.
 * @return {Mixed}               Json value of the key, or the default.
 */
ls.get = (key, defaultValue) => {
  let value
  value = storage.getItem(key, value)
  if (value === null || value === "undefined" || value === "") {
    value = defaultValue
  }
  else {
    value = JSON.parse(value)
  }
  return value
}

/**
 * Remove a key and its value from local storage
 */
ls.del = (key) => {
  return storage.removeItem(key)
}

/**
 * Allow a all in one getter/setter to local storage key.
 * @method store
 * @param  {string} key     The key to get or to set.
 * @param  {Mixed}  [value] Without value, this method will retrieve key value. If you set this parameter, then the value of the key wil be set.
 * @return {Mixed}          Return the value of the key or undefined if you set it.
 * @example
 * ls.store('test', 42) // Set value of key "test" to 42
 * ls.store('test') // Return value of key "test": 42
 */
ls.store = (key, value) => {
  if (value === undefined) {
    return ls.get(key)
  }
  else {
    ls.set(key, value)
  }
}

export default ls
