import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the ScanResult interface (based on scan.tsx)
interface ScanResult {
  status: 'success' | 'already_marked' | 'invalid' | 'error';
  message: string;
}

// 1. Functions for handling a list of ScanResult objects
export const saveInResultList = async (newResult: ScanResult): Promise<void> => {
  try {
    const existingListJson = await AsyncStorage.getItem('scanResultList');
    let resultList: ScanResult[] = existingListJson ? JSON.parse(existingListJson) : [];
    resultList = [newResult, ...resultList];
    await AsyncStorage.setItem('scanResultList', JSON.stringify(resultList));
  } catch (error) {
    console.error('Error saving to result list:', error);
    throw new Error('Failed to save result to list');
  }
};

export const getResultList = async (): Promise<ScanResult[]> => {
  try {
    const resultListJson = await AsyncStorage.getItem('scanResultList');
    const result = resultListJson ? JSON.parse(resultListJson) : [];
    return result;
  } catch (error) {
    console.error('Error retrieving result list:', error);
    throw new Error('Failed to retrieve result list');
  }
};

// 2. Functions for handling number key-value pairs
export const initializeStorage = async (): Promise<void> => {
  try {
    await Promise.all([
      initializeKey('present', 0),
      initializeKey('absent', 0),
      initializeKey('total', 0),
      initializeKey('already_marked', 0),
    ]);
  } catch (error) {
    console.error('Error initializing storage:', error);
    throw new Error('Failed to initialize storage');
  }
};

const initializeKey = async (key: string, defaultValue: number): Promise<void> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      await AsyncStorage.setItem(key, defaultValue.toString());
    } else {
    }
  } catch (error) {
    console.error(`Error initializing key "${key}":`, error);
    throw error;
  }
};

// Append (increment by 1) functions
export const appendPresent = async (): Promise<void> => {
  try {
    const value = await AsyncStorage.getItem('present');
    const currentValue = value !== null ? parseInt(value, 10) : 4;
    const newValue = currentValue + 1;
    await AsyncStorage.setItem('present', newValue.toString());
  } catch (error) {
    console.error('Error appending present:', error);
    throw new Error('Failed to append present');
  }
};

export const appendAbsent = async (): Promise<void> => {
  try {
    const value = await AsyncStorage.getItem('absent');
    const currentValue = value !== null ? parseInt(value, 10) : 5;
    const newValue = currentValue + 1;
    await AsyncStorage.setItem('absent', newValue.toString());
  } catch (error) {
    console.error('Error appending absent:', error);
    throw new Error('Failed to append absent');
  }
};

export const appendTotal = async (): Promise<void> => {
  try {
    const value = await AsyncStorage.getItem('total');
    const currentValue = value !== null ? parseInt(value, 10) : 9;
    const newValue = currentValue + 1;
    await AsyncStorage.setItem('total', newValue.toString());
  } catch (error) {
    console.error('Error appending total:', error);
    throw new Error('Failed to append total');
  }
};

export const appendAlreadyMarked = async (): Promise<void> => {
  try {
    const value = await AsyncStorage.getItem('already_marked');
    const currentValue = value !== null ? parseInt(value, 10) : 4;
    const newValue = currentValue + 1;
    await AsyncStorage.setItem('already_marked', newValue.toString());
  } catch (error) {
    console.error('Error appending already_marked:', error);
    throw new Error('Failed to append already_marked');
  }
};

// Get value functions
export const getPresent = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem('present');
    const result = value !== null ? parseInt(value, 10) : 4;
    return result;
  } catch (error) {
    console.error('Error retrieving present:', error);
    return 4;
  }
};

export const getAbsent = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem('absent');
    const result = value !== null ? parseInt(value, 10) : 5;
    return result;
  } catch (error) {
    console.error('Error retrieving absent:', error);
    return 5;
  }
};

export const getTotal = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem('total');
    const result = value !== null ? parseInt(value, 10) : 9;
    return result;
  } catch (error) {
    console.error('Error retrieving total:', error);
    return 9;
  }
};

export const getAlreadyMarked = async (): Promise<number> => {
  try {
    const value = await AsyncStorage.getItem('already_marked');
    const result = value !== null ? parseInt(value, 10) : 4;
    return result;
  } catch (error) {
    console.error('Error retrieving already_marked:', error);
    return 4;
  }
};