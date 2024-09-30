import { useEffect, useState } from 'react';
import Button from '../general/button';

export default function ConfirmPlay({ func1 }) {
    return (
        <div className="flex flex-col font-[family-name:var(--font-ibm-bi)] w-full h-screen content-center items-center">
            <div className="flex text-center items-center text-3xl text-white m-12 h-1/2">
                PLEASE PRESS "PLAY" TO PROCEED
            </div>
            <Button value="PLAY" func={() => { func1(); }} />
        </div>
    );
}