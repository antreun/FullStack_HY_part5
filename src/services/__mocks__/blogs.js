let token = null

const blogs = [
  {
    _id: "12341df7571c224a31b5c8ce",
    title: "Blogi numero 1",
    author: "Tero Testi",
    url: "https://www.google.fi",
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "testuser",
      name: "Testing User"
    }
  },
  {
    _id: "5a451df7571c224a31b5c8ce",
    title: "Toinen kirjoitus",
    author: "Harri Harjoitus",
    url: "https://www.bing.com",
    user: {
      _id: "5a437a912343b7f168ddf138",
      username: "seconduser",
      name: "Testing User 2"
    }
  }

]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { getAll, blogs, setToken }
