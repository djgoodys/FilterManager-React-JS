import { createAsyncThunk } from '@reduxjs/toolkit';

export const Login = createAsyncThunk(
  'userData/Login',
  async (obj, { rejectWithValue }) => {
    if(obj.action != "logout"){
    console.log("from loginThunk.js logging in");
    const formData = new FormData();
    formData.append('username', obj.username);
    formData.append('password', obj.password);
    formData.append('action', obj.action);
    formData.append('backup_folder', obj.backup_folder);

    try {
      const response = await fetch(`${process.env.REACT_APP_PHP_SERVER}/users.php`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
  else
  {
    const data = {login:'logout'}
    return data
  }
}
);
