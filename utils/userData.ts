import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from './storage.token';
import { API } from '@/constants/api.const';


const fetchData  = async() => {
    try {
        const token = await getToken()
        if(!token){
            return {}
        }
        const response  = await fetch(`${API}/api/Auth/me`,{
             method: 'GET',
                headers: {
                  'accept': '*/*',
                  'Authorization': `Bearer ${token}`,
                },
        })
        if (response.ok){
    
            const data  = await response.json()
            return data;
        }
        else{
            throw new Error();
            
        }
    } catch (error) {
        console.error(error);
        return {}
    }
    
     
    
}
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('data');
  } catch (err) {
    console.error('Error removing user:', err);
  }
};

export const saveUser = async () => {
  try {
    const data  = await fetchData()
    await Promise.all(
      [await removeUser()]
    )
    await removeUser()
    await AsyncStorage.setItem('data', JSON.stringify(data));
  } catch (err) {
    console.error('Error saving user:', err);
  }

};



export const getUser = async () => {
  try {
    const stored = await AsyncStorage.getItem('data');
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    console.error('Error reading data:', err);
    return null;
  }
};