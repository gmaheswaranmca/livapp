export interface User {
  email: string;
  password: string;
}

export interface Trainer {
  _id?: string;
  name: string;
  skills: string[];
  photo: string;
  status: "Active" | "Inactive";
}