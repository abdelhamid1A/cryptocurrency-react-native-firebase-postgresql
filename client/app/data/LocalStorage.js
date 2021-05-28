import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
async function setItemToLocalStorage (key, value) {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
        console.log(e);
    }
  }
async function getItemFromLocalStorage(key,setState)  {

    try {
      const value = await AsyncStorage.getItem(key,(error,value)=>{
        if(value !== null) {
        // console.log(value);
        setState(value);
      }
      })
      
    } catch(e) {
      console.log(e);
    }
  }

  async function saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getItem(key,setState) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      setState(result);
    } 
  }

export {setItemToLocalStorage, getItemFromLocalStorage,saveItem,getItem}