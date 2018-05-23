const Redis = require('./src/redis')
const app = require('./src/app')

const redis = new Redis()
app.listen(3000, () => {
  console.log('Web server running on port 3000!')
})
