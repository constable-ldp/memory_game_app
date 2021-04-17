const baseURL = 'http://localhost:3000/api/images'

export default {
  getImages() {
    return fetch(baseURL)
      .then(res => res.json())
  },

}