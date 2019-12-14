import axios from 'axios'

const URL = 'https://api.github.com/users/'

export const getReposUser = async (user) => {
  try {
    const res = await axios.get(`${URL}${user}/repos?per_page=100&sort=pushed`)
    return res.data
  } catch (error) {
    throw (error.message)
  }
}
