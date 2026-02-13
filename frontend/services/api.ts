// export const API_BASE_URL = "http://localhost:3000/api"; // sesuaikan port backendmu

// export async function adminLogin(email: string, password: string) {
//   const res = await fetch(`${API_BASE_URL}/admins/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Login gagal");
//   }

//   return res.json(); // { token: "...", admin: {...} }
// }


import { getApiBase } from "~~/config/api";

export async function adminLogin(email: string, password: string) {
  const API_BASE_URL = getApiBase(); // <-- sekarang dinamis dari .env

  const res = await fetch(`${API_BASE_URL}/admins/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login gagal");
  }

  return res.json(); // { token: "...", admin: {...} }
}
