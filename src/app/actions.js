'use server'

import { setServerVariable } from '@/store/store';

export async function updateServerVariable(newValue) {
    setServerVariable(newValue);
}