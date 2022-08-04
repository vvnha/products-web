import API from '../../helpers/api'

export const createProduct = (data) => API.post('products', data)

export const getAllProduct = (params) => API.get('products', params)

export const getProduct = (productId) => API.getById('products', productId)

export const getProductByCode = (productCode) =>
  API.getByCode('products', productCode)

export const updateProduct = (data) => API.put('products', data)

export const deleteProduct = (productId) => API.delete('products', productId)
