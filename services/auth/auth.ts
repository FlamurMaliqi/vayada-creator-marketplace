/**
 * Authentication service
 */

import { apiClient } from '../api/client'

export interface RegisterRequest {
  email: string
  password: string
  type: 'hotel' | 'creator'
  name?: string
}

export interface RegisterResponse {
  id: string
  email: string
  name: string
  type: string
  status: string
  message: string
}

export const authService = {
  /**
   * Login user
   */
  login: async (email: string, password: string) => {
    // TODO: Implement authentication
    throw new Error('Not implemented yet')
  },

  /**
   * Register user
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    return apiClient.post<RegisterResponse>('/auth/register', {
      email: data.email,
      password: data.password,
      type: data.type,
      ...(data.name && { name: data.name }),
    })
  },

  /**
   * Logout user
   */
  logout: async () => {
    // TODO: Implement logout
    throw new Error('Not implemented yet')
  },

  /**
   * Get current user
   */
  getCurrentUser: async () => {
    // TODO: Implement get current user
    throw new Error('Not implemented yet')
  },
}

