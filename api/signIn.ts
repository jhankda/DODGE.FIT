export type LoginPayload = {
  email?: string;
  phoneNo?: string;
  password: string | undefined;
  role: "user" | "coach" | "scanner" ;
};

export async function loginApi(payload: LoginPayload) {
  const res = await fetch("https:mock/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json(); 
}
