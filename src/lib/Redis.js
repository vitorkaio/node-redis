import redis from 'redis'

const Redis = () => {
  const client = redis.createClient()

  client.on('error', err => {
    console.log(err)
  })

  return {
    client
  }
}

export default Redis()
