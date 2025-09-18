import { Exercise } from "@schemas/user.schema";


export async function fetchClassApi(AUTH_TOKEN: string | null) {
  console.log("fetchApi")
  const res = await fetch("https://my.api.mockaroo.com/fetch_class_list.json", {
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
export async function fetchClassDetailsApi(AUTH_TOKEN: string | null, id: string) {
  console.log("fetchclassDetailsApi")
  const res = await fetch("https://my.api.mockaroo.com/class_detail.json", {
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

export async function fetchUserProfile(AUTH_TOKEN: string | null) {
  console.log("fetchclassDetailsApi")
  const res = await fetch("http://localhost:3000/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "643e87a0",
      "Authorization": `Bearer ${"AUTH_TOKEN"}`
    },
  }
  );

  const data = await res.json()
  console.log(data)

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return data;
}


export async function fetchWorkout(AUTH_TOKEN: string | null) {
  console.log("Fetching workout data...");

  try {
    const res = await fetch("https://mockfast.io/backend/apitemplate/get/845019038452209/workoutToday", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${AUTH_TOKEN}` 
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
    }

    console.log(res)

    const data = await res.json();
    console.log("Data fetched successfully:", data);
    return data;

  } catch (error) {
    console.error("Failed to fetch workout:", error);
    throw error;
  }
}

export type workoutPayload  = {
  muscleGroup:string,
  name:string;
  sets:string;
  reps:string;
  weight:string;
  time?:string;
}

export async function addWorkout(payload:workoutPayload,AUTH_TOKEN: string | null) {
  console.log("adding workout data...");
  
  try {
    const res = await fetch("https://mockfast.io/backend/apitemplate/post/845019038452209/addworkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${AUTH_TOKEN}` 
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
    }
    
    console.log(res)
    
    const data = await res.json();
    console.log("Data fetched successfully:", data);
    return data;
    
  } catch (error) {
    console.error("Failed to fetch workout:", error);
    throw error;
  }
}

export type updateWorkoutPayload = {
  muscleGroup?:string;
  name?:string;
  sets?:string;
  reps?:string;
  weight?:string;
  time:string;
}

export async function updateWorkout(payload:updateWorkoutPayload, AUTH_TOKEN: string | null, id:string) {
  console.log("adding workout data...");
  
  try {
    const res = await fetch("https://mockfast.io/backend/apitemplate/put/845019038452209/updateworkout/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${AUTH_TOKEN}` 
      },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
    }
    
    console.log(res)
    
    const data = await res.json();
    console.log("Data fetched successfully:", data);
    return data;
    
  } catch (error) {
    console.error("Failed to fetch workout:", error);
    throw error;
  }
}

export async function fetchWorkoutList(AUTH_TOKEN: string | null) {

  try {
    const res = await fetch("https://mockfast.io/backend/apitemplate/get/845019038452209/workoutList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${AUTH_TOKEN}` 
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
    }

    console.log(res)

    const data = await res.json();
    console.log("Data fetched successfully:", data);
    return data;

  } catch (error) {
    console.error("Failed to fetch workout:", error);
    throw error;
  }
}

export async function fetchInvoiceList(AUTH_TOKEN: string | null) {

  try {
    const res = await fetch("https://mockfast.io/backend/apitemplate/get/845019038452209/invoice", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${AUTH_TOKEN}` 
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `HTTP error! Status: ${res.status}`);
    }

    console.log(res)

    const data = await res.json();
    console.log("Data fetched successfully:", data);
    return data;

  } catch (error) {
    console.error("Failed to fetch workout:", error);
    throw error;
  }
}


