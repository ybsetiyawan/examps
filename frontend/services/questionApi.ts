import { getApiBase } from "~~/config/api";

// export async function fetchQuestions(token: string, examId: string) {
//   const API_BASE_URL = getApiBase();

//   const res = await fetch(
// `${API_BASE_URL}/exams/${examId}/questions`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Gagal mengambil soal");
//   }

//   const result = await res.json();
//   return result.data; // kita asumsikan backend kirim array
// }

export async function fetchQuestions(
  token: string,
  examId: String,
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
    `${API_BASE_URL}/exams/${examId}/questions?${params.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal fetch questions");
  }

  return res.json(); // { data, pagination, search }
}





export async function createQuestion(
  token: string,
  examId: string,
  payload: {
    question_text: string;
    order_no: number;
    score: number;
  },
) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/exams/${examId}/questions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal membuat soal");
  }

  return res.json();
}

export async function getQuestionById(
  token: string,
  examId: string,
  questionId: string,
) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(
    `${API_BASE_URL}/exams/${examId}/questions/${questionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal mengambil data soal");
  }

  return res.json();
}


export async function getQuestionSById(
  token: string,
  examId: string,
  questionId: string
) {
  const config = useRuntimeConfig();

  const res = await fetch(
    `${config.public.apiBase}/exams/${examId}/questions/${questionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.message || "Gagal mengambil data question");
  }

  return json.data; // ✅ hanya return data
}




export async function updateQuestion(
  token: string,
  examId: string,
  questionId: string,
  payload: any,
) {
  const API_BASE_URL = getApiBase();
  const res = await fetch(
    `${API_BASE_URL}/exams/${examId}/questions/${questionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal mengupdate soal");
  }

  return res.json();
}

export async function deleteQuestion(
  token: string,
  examId: string,
  questionId: string
) {
  const API_BASE_URL = useRuntimeConfig().public.apiBase;

  const res = await fetch(
    `${API_BASE_URL}/exams/${examId}/questions/${questionId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal menghapus soal");
  }

  return res.json();
}
