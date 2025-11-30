import { ClassList } from '@schemas/coach.schema';
import { ClassItem } from '@schemas/user.schema';

export function filterByStatus(
  items: ClassItem[] | ClassList[],
  status: "upcoming" | "present" | "past",
  role?: "user" | "coach"
) {
  const now = new Date();

  const todayStartUTC = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  ));

  const todayEndUTC = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23, 59, 59, 999
  ));

  return items.filter((item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);

    let category: "upcoming" | "present" | "past";

    if (endDate < (role === "coach" ? todayStartUTC : now)) {
      category = "past";
    } else if (
      startDate <= todayEndUTC &&
      endDate >= todayStartUTC
    ) {
      category = "present";
    } else {
      category = "upcoming";
    }

    return category === status;
  });
}


export const formatClassTime = (startISO: string, endISO: string, filter: string): boolean | string => {
  const startDate = new Date(startISO);
  const endDate = new Date(endISO);

  console.log("end", endISO)

  const pastOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  };

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }
  const formattedDate = startDate.toLocaleDateString('en-US', {month:'short',day:'numeric',year:'numeric'});
  const formatted = startDate.toLocaleDateString('en-GB', pastOptions);
  const day = startDate.toLocaleDateString('en-US', { weekday: 'short' });
  const startTime = startDate.toLocaleTimeString('en-US', { ...options, hour12: false }).replace(/(:\d{2}).*/, '$1');
  const endTime = endDate.toLocaleTimeString('en-US', options);
  const startTimeAM = startDate.toLocaleTimeString('en-US', options);
  if (filter == 'upcoming') return `${day}, ${startTime}-${endTime}`;
  if (filter == 'past') return `${startTime}-${endTime}`;
  if (filter == 'coach') return `${startTimeAM} - ${endTime}`;
  if (filter == 'longDate') return formatted;
  if (filter == 'classDetail') return `${startTimeAM}-\n${endTime}`
  if (filter === 'display') return `${formattedDate} • ${startTime} - ${endTime}`;
  if (filter == 'live') {
    const now = new Date()
    return now >= startDate && now <= endDate;

  } else return "NA"
};