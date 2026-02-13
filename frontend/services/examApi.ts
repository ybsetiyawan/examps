import { getApiBase } from "~~/config/api";


// export async function fetchExams(token: string) {
//   const API_BASE_URL = getApiBase();
//   const res = await fetch(`${API_BASE_URL}/exams`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Gagal mengambil data Exams");
//   }

//   const result = await res.json();

//   // Penting: backend kamu membungkus data di result.data
//   return result.data; // <-- kita kembalikan array langsung
// }

export async function fetchExams(
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
    `${API_BASE_URL}/exams?${params.toString()}`,
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



export async function createExam(
  token: string,
  payload: {
    title: string;
    description: string;
    duration_minutes: number;
    start_at?: string;
    end_at?: string;
  }
) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/exams`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal membuat exam");
  }

  return res.json();
}



export async function getExamById(token: string, id: string) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/exams/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengambil data exams");
  }

  const result = await res.json();
  return result.data; // <-- inilah data yang kamu pakai di form
}



export async function updateExam(
  token: string,
  id: string,
  payload: {
    title: string;
    description: string;
    duration_minutes: number;
  },
) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/exams/${id}`, {
    method: "PUT", // atau PUT kalau backendmu pakai PUT
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengupdate exam");
  }

  return res.json();
}
