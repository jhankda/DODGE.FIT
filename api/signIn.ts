export type LoginPayload = {
  email?: string;
  phoneNo?: string;
  password: string | undefined;
  role: "User" | "Coach" | "Scanner Device";
};

export async function loginApi(payload: LoginPayload) {
  const res = await fetch("https://my.api.mockaroo.com/sign_in_auth.json", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0"
    },
    body: JSON.stringify(payload),
  });

  console.log(payload)

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export type ForgotPassPayload = {
  email?: string;
  phoneNo?: string;
};

export async function forgotPassApi(payload: ForgotPassPayload) {
  const res = await fetch("https://my.api.mockaroo.com/success.json", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0"
    },
    body: JSON.stringify(payload),
  });

  console.log(payload)

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "OTP validation failed");
  }

  return payload
}
export type verifyPayload = {
  "email"?: string;
  "phoneNumber"?: string;
  "fullName"?:string;
  "password"?:string;
  "termsAgreed"?:boolean;
  "role"?:string;
  OTP: string;
};

export async function verifyAPI(payload: verifyPayload) {
  const res = await fetch("https://my.api.mockaroo.com/verify_otp.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "643e87a0"
      },
      body: JSON.stringify(payload),
    });
    console.log(payload)

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error || "OTP validation failed");
  }

  return res.json()
}

export type resetPassPayload = {
  newPassword:string,
  token:string
};

export async function resetPassAPI(payload: resetPassPayload) {
  const res = await fetch("https://my.api.mockaroo.com/verify_otp.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "643e87a0"
      },
      body: JSON.stringify(payload),
    });

    console.log(payload)

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error || "couldnt reset pass");
  }

  return;
}


export type signUpPayload = {
  fullName:string,
  password:string,
  email:string,
  phoneNumber:string,
  termsAgreed:boolean
};

export async function signUpAPI(payload: signUpPayload) {
  const res = await fetch("https://my.api.mockaroo.com/verify_otp.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": "643e87a0"
      },
      body: JSON.stringify(payload),
    });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error || "couldnt reset pass");
  }

  return res.json();
}


