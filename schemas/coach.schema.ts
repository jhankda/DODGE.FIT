export type ClassList = {
  id: string;
  name: string;
  time: string;
  startDate: string;
  endDate: string;
  imageLink?: string;
  enrolled: string;
  location: string;
  coach: string;
};


export type student = {
  id: string;
  name: string;
  image?: string;
  attendance?:boolean;
}

export type allStudents = {
  id:string;
  allEnrolledStudents:student[];
}

export type ClassDetail = {
  id:string;
  notes: string;
  enrolledStudentsSample: student[];
};

export type  stats = {
  totalClassAssigned:number;
  UserManaged:number;
  AttendanceAvg:number;
}

export type coacProfile  = {
  id:string;
  name:string;
  email:string;
  phoneNo:string;
  stats:[stats];
  image:string;
}


