/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import {
  addProduct as createProductAPI,
  editProduct,
  getAllProducts,
  getProductById,
  removeProduct
} from '../services/apiProducts'

const ProductContext = createContext()

const initialState = {
  products: [],
  isLoading: false,
  currentProduct: null,
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'products/loading':
      return { ...state, isLoading: true }
    case 'products/getAll':
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        currentProduct: null
      }
    case 'products/getById':
      return { ...state, currentProduct: action.payload, isLoading: false }
    case 'products/resetCurrent':
      return { ...state, currentProduct: null }
    case 'products/error':
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

function ProductProvider({ children }) {
  const [{ products, isLoading, currentProduct, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await getAllProducts()
      dispatch({ type: 'products/getAll', payload: res })
    } catch (error) {
      dispatch({ type: 'products/error', payload: error })
    }
  }, [])

  const deleteProduct = async (id) => {
    try {
      dispatch({ type: 'products/loading' })
      await removeProduct(id)
      fetchAllProducts()
    } catch (error) {
      dispatch({ type: 'products/error', payload: error })
    }
  }

  const updateProduct = async (productId, productData) => {
    try {
      dispatch({ type: 'products/loading' })
      await editProduct(productId, productData)
      dispatch({ type: 'products/create' })
      fetchAllProducts()
    } catch (error) {
      dispatch({ type: 'products/error', payload: error })
    }
  }
  const createProduct = useCallback(
    async (productData) => {
      try {
        dispatch({ type: 'products/loading' })
        await createProductAPI(productData)
        dispatch({ type: 'products/create' })
        fetchAllProducts()
      } catch (error) {
        dispatch({ type: 'products/error', payload: error })
      }
    },
    [fetchAllProducts]
  )
  const fetchProductById = async (productId) => {
    try {
      dispatch({ type: 'products/loading' })
      const res = await getProductById(productId)
      dispatch({ type: 'products/getById', payload: res })
    } catch (error) {
      dispatch({ type: 'products/error', payload: error })
    }
  }

  const resetCurrentProduct = () => {
    dispatch({ type: 'products/resetCurrent' })
  }

  useEffect(() => {
    fetchAllProducts()
  }, [fetchAllProducts])

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        currentProduct,
        error,
        fetchAllProducts,
        deleteProduct,
        resetCurrentProduct,
        updateProduct,
        createProduct,
        fetchProductById
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

function useProduct() {
  const context = useContext(ProductContext)
  if (context === undefined)
    throw new Error('ProductContext was used outside of ProductProvider')

  return context
}

export { ProductProvider, useProduct }
