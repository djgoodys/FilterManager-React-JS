import { createAsyncThunk } from '@reduxjs/toolkit';

export const manageFilterTypes= createAsyncThunk (
    'filter_types/manageFilterTypes',
    async (obj) =>{
        const response = await fetch(`${process.env.REACT_APP_PHP_SERVER}/filters.php?action=${obj.action}&backup_folder=${obj.backup_folder}&type=${obj.type}&trackable=${obj.trackable}&unit_id=${obj.id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        })
        if(!response.ok){
          console.log("from filtertypesThunk: network error")
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return data
    }
)
