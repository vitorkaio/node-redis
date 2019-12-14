import * as gitHubApi from './services/GithubApi'
import ReposRedis from './controllers/ReposRedis'

const printRepo = (list) => {
  console.table(list)
}

const app = async () => {
  try {
    const repoRedis = new ReposRedis()

    // Verifica se os repos já estão no redis
    const res = await repoRedis.getRepos()
    if (res.length !== 0) {
      const reposIndex = await repoRedis.getRepoIndex()
      const cont = parseInt(reposIndex)
      if (cont === res.length) {
        console.log('\nAll Repos processaded!\n')
        process.exit(0)
      }
      const list = []
      for (let index = 0; index < 10; index++) {
        if (cont + index === res.length) {
          printRepo(list)
          await repoRedis.setRepoIndex(cont + index)
          process.exit(0)
        }
        list.push({ repo_index: cont + (index + 1), name: res[cont + index] })
      }
      printRepo(list)
      await repoRedis.setRepoIndex(cont + 10)
      process.exit(0)
    } else { // Se os repos não tiverem, baixa e os salva
      const repos = await gitHubApi.getReposUser('vitorkaio')
      const indexRes = await repoRedis.setRepoIndex(0)
      const res = await repoRedis.saveRepos(repos)
      if (res && indexRes) {
        console.log('Repos Save!')
      }
    }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

app()
