import axiosClient from './axiosClient'

export const deleteData = (resource, productId) => {
  const url = `/${resource}/${productId}`

  return axiosClient.delete(url)
}

export const putData = (resource, data) => {
  const url = `/${resource}/${data.id}`

  return axiosClient.put(url, data)
}

export const postData = (resource, data) => {
  const url = `/${resource}`

  return axiosClient.post(url, data)
}

export const getDataById = (resource, productId) => {
  const url = `/${resource}/${productId}`

  return axiosClient.get(url)
}

export const getDataByCode = (resource, code) => {
  const url = `/${resource}?search=${code}`

  return axiosClient.get(url)
}

export const getData = (resource, params) => {
  const url = `/${resource}`

  return axiosClient.get(url, { params })
}

const API = {
  get: getData,
  getById: getDataById,
  post: postData,
  put: putData,
  delete: deleteData,
  getByCode: getDataByCode,
}

export default API
