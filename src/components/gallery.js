'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import img1 from "@/assets/1.jpg";
import img2 from "@/assets/2.jpg";
import img3 from "@/assets/3.jpg";


const Gallery = ({ dataList }) => {
    const images = [img1, img2, img3]
    return (
        <div>
            {
                dataList.map((pic, index) => {
                    return <Image className="pic-main" src={images[index]} width="500" height="500" />
                })
            }
        </div>
    );
};

export default Gallery;