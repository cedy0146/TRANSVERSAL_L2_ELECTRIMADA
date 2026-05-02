/**
 * Service API pour ElectriMada Web
 * Gère la communication avec le backend Node.js
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

async function fetchFromBackend(endpoint: string, options: RequestInit = {}) {
  try {
    const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Erreur API: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  auth: {
    login: (credentials: { nom: string; pin: string }) => fetchFromBackend('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    signup: (userData: { nom: string; pin: string; role: string; id_foyer?: string }) => 
      fetchFromBackend('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
      }),
    logout: () => fetchFromBackend('/auth/logout', { method: 'POST' }),
  },
  batteries: {
    getAll: () => fetchFromBackend('/batteries'),
    getActive: () => fetchFromBackend('/batteries/active'),
    updateLevel: (id: number, niveau: number) => fetchFromBackend(`/batteries/${id}/niveau`, {
      method: 'PUT',
      body: JSON.stringify({ niveau }),
    }),
    getStats: () => fetchFromBackend('/batteries/stats'),
  },
  foyers: {
    getAll: () => fetchFromBackend('/foyers'),
    getById: (id: string) => fetchFromBackend(`/foyers/${id}`),
    delete: (id: string) => fetchFromBackend(`/foyers/${id}`, {
      method: 'DELETE',
    }),
  },
  demandes: {
    getAll: () => fetchFromBackend('/demandes'),
    getPrioritised: () => fetchFromBackend('/demandes/priorisees'),
    create: (data: any) => fetchFromBackend('/demandes', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    accept: (id: number) => fetchFromBackend(`/demandes/${id}/accepter`, {
      method: 'PUT'
    }),
  },
  optimisation: {
    getAllocation: (data: any) => fetchFromBackend('/optimisation/allocation', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  prevision: {
    getSolaire: () => fetchFromBackend('/prevision/solaire'),
    getConsommation: () => fetchFromBackend('/prevision/consommation-intervalle'),
  },
  community: {
    getAll: () => fetchFromBackend('/communities'),
    getById: (id: string) => fetchFromBackend(`/communities/${id}`),
    getMembers: (id: string) => fetchFromBackend(`/communities/${id}/members`),
    getStats: (id: string) => fetchFromBackend(`/communities/${id}/stats`),
  },
};
