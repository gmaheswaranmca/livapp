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

export const createTrainer = async (data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getTrainerById = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers/${id}`, {
    headers: { Authorization: token || "" }
  });

  return res.json();
};

export const updateTrainer = async (id: string, data: any) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/api/trainers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token || ""
    },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const deleteTrainer = async (id: string) => {
  const token = localStorage.getItem("token");

  await fetch(`${API_URL}/api/trainers/${id}`, {
    method: "DELETE",
    headers: { Authorization: token || "" }
  });
};

