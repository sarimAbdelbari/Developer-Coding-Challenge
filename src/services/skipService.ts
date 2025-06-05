import axios from '@/api/axios';
import type { Skip } from '@/types/skip'; // Import the Skip type

// Remove the local interface definition for Skip as it's now imported

export const getAllSkips = async (): Promise<Skip[]> => {
  try {
    // Ensure the endpoint is correct and accessible
    const response = await axios.get<Skip[]>('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
    return response.data;
  } catch (error) {
    console.error('Error fetching skips:', error);
    // It's often better to throw a new error or a more specific error
    // or handle it in a way that the UI can understand (e.g., return null or an empty array with a status)
    throw error; 
  }
}