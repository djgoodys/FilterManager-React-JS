import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageUsers = createAsyncThunk (
    'users/manageUsers',
    async (obj) =>{
      const formData = new FormData();
        formData.append('username', obj.username);
        formData.append('password', obj.password);
        formData.append('action', obj.action);
        formData.append('backup_folder', obj.backup_folder)
        formData.append('id', obj.id)
        formData.append('admin', obj.admin)
        formData.append('email', obj.email)
        const response = await fetch(`${process.env.REACT_APP_PHP_SERVER}/users.php`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        })
        if(!response.ok){
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    }
)

