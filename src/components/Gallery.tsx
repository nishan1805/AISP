'use client';
import React, { useEffect, useState } from 'react'
import Tag from './Tag'
import CustomizeSlider from './CustomizeSlider'
import staticGalleries from '@/data/gallery';
import { photoGalleryService } from '@/services/photoGalleryService';
import { GalleryInterface } from '@/interfaces';

const Gallery: React.FC = () => {
  const [galleries, setGalleries] = useState<GalleryInterface[]>(staticGalleries);

  useEffect(() => {
    photoGalleryService.getAll()
      .then((data) => {
        if (data.length > 0) {
          setGalleries(
            data.map((item) => ({
              image: item.images?.[0] || '',
              title: item.title,
              date: item.event_date || '',
            }))
          );
        }
      })
      .catch(() => {
        // keep static fallback
      });
  }, []);

  return (
    <section className="max-sm:px-[16px] sm:px-[30px] lg:px-[50px] xl:px-[100px] py-[50px]">
      <Tag
        label='Benefits'
        textColor='text-[#5350FF]'
        backgroundColor='bg-[#CAC9FF]'
      />
      <CustomizeSlider
        data={galleries}
        header={"Our Gallery"}
        source="gallery"
      // variableWidth={true}
      />
    </section>
  );
};

export default Gallery