import { API } from "@/constants/api.const";
import { getToken } from "./storage.token";
export async function getFormattedClassList() {
  try {

    const token  = await getToken();
    const response = await fetch(`${API}/`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const classList = await response.json();

    const formatted = classList.map(item => {
      const startTime = new Date(item.startTime);
      let hours = startTime.getHours();
      const minutes = startTime.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // hour '0' should be '12'

      return `${item.name} – ${hours}${ampm}`;
    });

    return formatted;
  } catch (error) {
    console.error('Error fetching class list:', error);
    return [];
  }
}
