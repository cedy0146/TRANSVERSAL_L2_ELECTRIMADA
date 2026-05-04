// front_web/lib/api.tsx
import axios from "axios";

// Configuration Axios
const instance = axios.create({
baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Types génériques
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// ---------------------- Types ----------------------
export interface User {
  id_utilisateur: number;
  nom: string;
  role: string;
  id_foyer?: string;
}

export interface Stats {
  conso_actuelle: string;
  conso_mensuelle: string;
  cout_estime: string;
  appareils_actifs: number;
  batteries_ok: number;
  alertes: any[];
  appareils: any[];
  demandes_total: number;
}

// ---------------------- AUTH API ----------------------
export const authAPI = {
  login: async (nom: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const res = await instance.post("/auth/login", { nom, password });
    if (res.data.success && res.data.data?.token) {
      localStorage.setItem("token", res.data.data.token);
    }
    return res.data;
  },

  register: async (nom: string, password: string, id_foyer?: string): Promise<ApiResponse<null>> => {
    const res = await instance.post("/auth/register", { nom, password, id_foyer });
    return res.data;
  },

  logout: async (): Promise<void> => {
    await instance.post("/auth/logout");
    localStorage.removeItem("token");
  },
};

// ---------------------- DASHBOARD API ----------------------
export const dashboardAPI = {
  stats: async (): Promise<ApiResponse<Stats>> => {
    const res = await instance.get("/dashboard/stats");
    return res.data;
  },
};
