import { getApiBase } from "~~/config/api";

// export async function fetchEmployees(token: string) {
//   const API_BASE_URL = getApiBase();
//   const res = await fetch(`${API_BASE_URL}/employees`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Gagal mengambil data karyawan");
//   }

//   const result = await res.json();

//   // Penting: backend kamu membungkus data di result.data
//   return result.data; // <-- kita kembalikan array langsung
// }

export async function fetchEmployees(
  token: string,
  page = 1,
  limit = 10,
  search = ""
) {
  const API_BASE_URL = useRuntimeConfig().public.apiBase;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) {
    params.append("search", search);
  }

  const res = await fetch(
    `${API_BASE_URL}/employees?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal fetch employees");
  }

  return res.json(); // { data, pagination, search }
}



export async function createEmployee(
  token: string,
  payload: {
    nik: string;
    name: string;
    spcd: string;
    spname: string;
    email: string;
  },
) {
  const API_BASE_URL = getApiBase();
  const res = await fetch(`${API_BASE_URL}/employees`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal menambah karyawan");
  }

  return res.json();
}

export async function getEmployeeById(token: string, id: string) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengambil data karyawan");
  }

  const result = await res.json();
  return result.data; // <-- inilah data yang kamu pakai di form
}

export async function updateEmployee(
  token: string,
  id: string,
  payload: {
    nik: string;
    name: string;
    spcd: string;
    spname: string;
    email: string;
    is_active?: boolean;
  },
) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: "PUT", // atau PUT kalau backendmu pakai PUT
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengupdate karyawan");
  }

  return res.json();
}

export async function deleteEmployee(token: string, id: string) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/employees/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal menghapus karyawan");
  }

  return res.json();
}
