const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginApi = async (data: any) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getTrainers = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers`, {
    headers: {
      Authorization: token || ""
    }
  });

  return res.json();
};