const redis = require('redis')

class Redis {
  constructor () {
    this.client = redis.createClient()
    this.client.on('connect', this.onConnected)
    this.client.on('error', this.onError)
  }

  static getClient () {
    if (!this.client) {
      this.client = redis.createClient()
    }
    return this.client
  }

  onConnected () {
    console.log('Connected to Redis')
  }

  onError (error) {
    console.error(error.message)
  }
}

module.exports = Redis
