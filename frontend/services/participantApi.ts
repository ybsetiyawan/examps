export const API_BASE_URL = "http://localhost:3000/api";

export async function fetchParticipants(token: string) {
  const res = await fetch(`${API_BASE_URL}/employees`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal mengambil data peserta");
  }

  return res.json(); // array peserta
}
