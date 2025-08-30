export type ClassItem = {
  id: {
    $oid: string;
  };
  name: string;
  time: string; // e.g., "6:30 PM"
  startDate: string; // ISO string, e.g., "2024-12-07T18:38:45Z"
  endDate:string;
  icon?: string; // e.g., "yoga"
  coach?: string; // e.g., "Emmaline"
  image?: string; // e.g., "yoga"
};
export type ClassDetail = {
  id: {
    $oid: string;
  };
  name: string;
  slug:string;
  time: string;
  startDate: string; 
  endDate: string; 
  icon?: string; 
  coach: string;
  image?: string; 
  loaction:string;
  attended:boolean;
  notes:string;
  info:string;
  workoutLog:string;
  
};
