export type ClassItem = {
  id: {
    $oid: string;
  };
  name: string;
  time: string;
  startDate: string;
  endDate: string;
  icon?: string;
  coach?: string;
  image?: string;
  attended?: boolean
};
export type ClassDetail = {
  id: {
    $oid: string;
  };
  name: string;
  slug: string;
  time: string;
  startDate: string;
  endDate: string;
  icon?: string;
  coach: string;
  image?: string;
  loaction: string;
  attended: boolean;
  notes: string;
  info: string;
  workoutLog: string;

};

export type Exercise = {
  id:string,
  name: string;
  sets: string;
  reps: string;
  weight: string;
  time?: string;
};

export type MuscleGroup = {
  id:string,
  name: string;
  exercises: Exercise[];
};

export type workoutLog = {
  id:string,
  date:string;
  workout:MuscleGroup[];
}

export type workList  = {
  workList:workoutLog[]
}


type Attendance_Summary = {
  Total_Classes: 'atring',
  Present: 'string',
  Absent: 'string'
}

 type Subscription = {
  Plan_type:'string',
  Plan_status:'Active'|'InActive'
  validity:'string'
}

 type Health_Metrics = {
  Height:'string',
  weight:'string',
  BMI:'string',
  waist_hip_Ratio:'string',
}

export type userProfile = {
  id:'string'
  fullName: 'string',
  email: 'string',
  image_link:'string',
  Attendance_Summary: Attendance_Summary,
  Health_Metrics:Health_Metrics,
  Subscription:Subscription,
}

export type WorkoutPlan = MuscleGroup[];

export type invoice = {
  id:string,
  InvoiceId:string,
  amount:string,
  date:string,
  status:boolean
}

