

import { createAsyncThunk } from '@reduxjs/toolkit';

export const Logout = createAsyncThunk(
    'userData/loggedIn',
    async () => {
        const data = { LoggedIn: "false" };
        return data;
    }
);

