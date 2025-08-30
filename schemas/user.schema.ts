export type ClassItem = {
  id: {
    $oid: string;
  };
  name: string;
  time: string; 
  startDate: string; 
  endDate:string;
  icon?: string;
  coach?: string; 
  image?: string; 
  attended?:boolean
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

export type Exercise = {
  id: string;         
  name: string;       
  sets: number;       
  reps: number;       
  weight?: number;    
  time?: string;      
};

export type MuscleGroup = {
  id: string;         // unique id for section
  name: string;       // e.g. "Arms", "Legs"
  exercises: Exercise[];
};

export type WorkoutPlan = MuscleGroup[];

