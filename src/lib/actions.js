'use server'

import { setServerVariable, getServerVariable } from './store';

export async function updateServerVariable(newValue) {
    setServerVariable(newValue);
    return getServerVariable();
}