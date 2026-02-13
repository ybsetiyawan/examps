import { useRuntimeConfig } from "#imports";
import { getApiBase } from "~~/config/api";




export async function fetchOptions(
  token: string,
  examId: string,
  questionId: string
) {
  const config = useRuntimeConfig();

  const res = await fetch(
    `${config.public.apiBase}/exams/${examId}/questions/${questionId}/options`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Gagal mengambil options");
  }

  return res.json();
}

export async function deleteOption(
  token: string,
  examId: string,
  questionId: string,
  optionId: string
) {
  const config = useRuntimeConfig();

  const res = await fetch(
    `${config.public.apiBase}/exams/${examId}/questions/${questionId}/options/${optionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Gagal menghapus option");
  }

  return res.json();
}

export async function getQuestionById(token: string, id: string) {
  const API_BASE_URL = getApiBase();

  const res = await fetch(`${API_BASE_URL}/questions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengambil data questions");
  }

  const result = await res.json();
  return result.data; // <-- inilah data yang kamu pakai di form
}


