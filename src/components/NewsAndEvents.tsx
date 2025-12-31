'use client';

import React, { useEffect, useState } from 'react'
import CustomizeSlider from './CustomizeSlider'
import Tag from './Tag'
import { newsMediaService } from '@/services/newsMediaService'
import { NewsMedia } from '@/types/supabase'

const NewsAndEvents: React.FC = () => {
  const [news, setNews] = useState<NewsMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await newsMediaService.getRecent(6);
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="px-[100px] py-[50px]">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E2879]"></div>
        </div>
      </section>
    );
  }

  return (
  <section className="px-[100px] py-[50px]">
  <Tag
  label='New'
  textColor='text-[#FE0000]'
  backgroundColor='bg-[#FFE6E6]'
  />
    <CustomizeSlider
    data = {news} 
    header = {"News And Events"}
    source = "news"
    slidesToShow = {4}
    isNavigationShow = {false}
    isViewAllBtnShow = {true}
    viewAllPageLink = {"/"}
  />
    </section>
  
  )
}

export default NewsAndEvents