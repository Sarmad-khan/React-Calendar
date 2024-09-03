import axios from 'axios';

const API_URL = 'http://api.aladhan.com/v1';

export const fetchDateData = async (month, year, isHijri) => {
  const endpoint = isHijri
    ? `/hToGCalendar/${month}/${year}`
    : `/gToHCalendar/${month}/${year}`;

  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching date data:', error);
    throw error;
  }
};
