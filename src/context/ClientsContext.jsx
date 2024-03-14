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
  addClient as createClientAPI,
  editClient,
  getAllClients,
  getClientById,
  removeClient
} from '../services/apiClients'

const ClientContext = createContext()

const initialState = {
  clients: [],
  isLoading: false,
  currentClient: null,
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'clients/loading':
      return { ...state, isLoading: true }
    case 'clients/getAll':
      return {
        ...state,
        clients: action.payload,
        isLoading: false,
        currentClient: null
      }
    case 'clients/getById':
      return { ...state, currentClient: action.payload, isLoading: false }
    case 'clients/resetCurrent':
      return { ...state, currentClient: null }
    case 'clients/error':
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

function ClientProvider({ children }) {
  const [{ clients, isLoading, currentClient, error }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const fetchAllClients = useCallback(async () => {
    try {
      const res = await getAllClients()
      dispatch({ type: 'clients/getAll', payload: res })
    } catch (error) {
      dispatch({ type: 'clients/error', payload: error })
    }
  }, [])

  const deleteClient = async (id) => {
    try {
      dispatch({ type: 'clients/loading' })
      await removeClient(id)
      fetchAllClients()
    } catch (error) {
      dispatch({ type: 'clients/error', payload: error })
    }
  }

  const updateClient = async (clientId, clientData) => {
    try {
      dispatch({ type: 'clients/loading' })
      await editClient(clientId, clientData)
      dispatch({ type: 'clients/create' })
      fetchAllClients()
    } catch (error) {
      dispatch({ type: 'clients/error', payload: error })
    }
  }
  const createClient = useCallback(
    async (clientData) => {
      try {
        dispatch({ type: 'clients/loading' })
        await createClientAPI(clientData)
        dispatch({ type: 'clients/create' })
        fetchAllClients()
      } catch (error) {
        dispatch({ type: 'clients/error', payload: error })
      }
    },
    [fetchAllClients]
  )
  const fetchClientById = async (clientId) => {
    try {
      dispatch({ type: 'clients/loading' })
      const res = await getClientById(clientId)
      dispatch({ type: 'clients/getById', payload: res })
    } catch (error) {
      dispatch({ type: 'clients/error', payload: error })
    }
  }

  const resetCurrentClient = () => {
    dispatch({ type: 'clients/resetCurrent' })
  }

  useEffect(() => {
    fetchAllClients()
  }, [fetchAllClients])

  return (
    <ClientContext.Provider
      value={{
        clients,
        isLoading,
        currentClient,
        error,
        fetchAllClients,
        deleteClient,
        resetCurrentClient,
        updateClient,
        createClient,
        fetchClientById
      }}
    >
      {children}
    </ClientContext.Provider>
  )
}

function useClient() {
  const context = useContext(ClientContext)
  if (context === undefined)
    throw new Error('ClientContext was used outside of ClientProvider')

  return context
}

export { ClientProvider, useClient }
