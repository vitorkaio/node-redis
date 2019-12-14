import Redis from '../lib/Redis'

const REPOS = 'repos'
const REPOS_INDEX = 'reposIndex'

class ReposRedis {
  constructor () {
    this.client = Redis.client
  }

  // Salva os repos no redis
  saveRepos (repos) {
    return new Promise((resolve, reject) => {
      for (const repo of repos) {
        this.client.rpush(REPOS, repo.name, (err, _) => {
          if (err) {
            reject(err)
          } else {
            resolve(true)
          }
        })
      }
    })
  }

  // Retorna todos os repos salvo no redis
  getRepos () {
    return new Promise((resolve, reject) => {
      this.client.lrange(REPOS, 0, -1, (err, repos) => {
        if (err) {
          reject(err)
        } else {
          resolve(repos)
        }
      })
    })
  }

  // Salva o último repo lido
  setRepoIndex (index) {
    return new Promise((resolve, reject) => {
      this.client.set(REPOS_INDEX, index, (err, _) => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }

  // Retorna o último index salvo
  getRepoIndex () {
    return new Promise((resolve, reject) => {
      this.client.get(REPOS_INDEX, (err, index) => {
        if (err) {
          reject(err)
        } else {
          resolve(index)
        }
      })
    })
  }
}// Fim da classe

export default ReposRedis
