export async function fetchClassApi(AUTH_TOKEN: string | null) {
  console.log("fetchApi")
  const res = await fetch("https://my.api.mockaroo.com/fetch_coach_class_list.json", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0",
      "Authorization": `Bearer ${"AUTH_TOKEN"}`
    },
  });


  const data = await res.json()
  console.log(data)

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return data;
}

export async function  fetchClassDetail(AUTH_TOKEN: string | null) {
  console.log("fetchApi")
  const res = await fetch("https://my.api.mockaroo.com/coach_notes.json", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0",
      "Authorization": `Bearer ${"AUTH_TOKEN"}`
    },
  });
  const data = await res.json()

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return data;
}

export async function  fetchEnrolledStudents(AUTH_TOKEN: string | null) {
  console.log("fetchApi")
  const res = await fetch("https://my.api.mockaroo.com/enrolled_students.json", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0",
      "Authorization": `Bearer ${"AUTH_TOKEN"}`
    },
  });
  const data = await res.json()

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return data;
}

export async function  fetchCoachProfile(AUTH_TOKEN: string | null) {
  console.log("fetchApi")
  const res = await fetch("https://my.api.mockaroo.com/coach_profile.json", {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0",
      "Authorization": `Bearer ${"AUTH_TOKEN"}`
    },
  });
  const data = await res.json()

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return data;
}

