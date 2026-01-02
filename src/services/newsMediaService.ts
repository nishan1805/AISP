import { supabase } from '@/utils/supabaseClient';
import Tables from '@/constants/tables';
import { NewsMedia } from '@/types/supabase';

export const newsMediaService = {
  // Get all news media (only visible and posted)
  async getAll(): Promise<NewsMedia[]> {
    const { data, error } = await supabase
      .from(Tables.NewsMedia)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'New')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news media:', error);
      throw error;
    }

    return data || [];
  },

  // Get news media grouped by title (for main media page)
  async getAllGroupedByTitle(): Promise<{ [title: string]: NewsMedia[] }> {
    const newsItems = await this.getAll();
    
    const grouped = newsItems.reduce((acc, newsItem) => {
      if (!acc[newsItem.title]) {
        acc[newsItem.title] = [];
      }
      acc[newsItem.title].push(newsItem);
      return acc;
    }, {} as { [title: string]: NewsMedia[] });

    return grouped;
  },

  // Get all news media with the same title
  async getByTitle(title: string): Promise<NewsMedia[]> {
    const { data, error } = await supabase
      .from(Tables.NewsMedia)
      .select('*')
      .eq('title', title)
      .eq('visibility', true)
      .eq('status', 'Posted')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching news media by title:', error);
      throw error;
    }

    return data || [];
  },

  // Get single news media by ID or post_id (keeping for backward compatibility)
  async getById(id: string): Promise<NewsMedia | null> {
    const { data, error } = await supabase
      .from(Tables.NewsMedia)
      .select('*')
      .or(`id.eq.${id},post_id.eq.${id}`)
      .eq('visibility', true)
      .eq('status', 'Posted')
      .single();

    if (error) {
      console.error('Error fetching news media:', error);
      return null;
    }

    return data;
  },

  // Filter news media by year and month
  async filterByDate(year?: number, month?: string): Promise<NewsMedia[]> {
    let query = supabase
      .from(Tables.NewsMedia)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Posted');

    if (year) {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      query = query.gte('event_date', startDate).lte('event_date', endDate);
    }

    if (month && month !== 'All Month') {
      const monthIndex = new Date(`${month} 1, 2000`).getMonth() + 1;
      const monthStr = monthIndex.toString().padStart(2, '0');
      query = query.like('event_date', `%-${monthStr}-%`);
    }

    const { data, error } = await query.order('event_date', { ascending: false });

    if (error) {
      console.error('Error filtering news media:', error);
      throw error;
    }

    return data || [];
  },

  // Search news media by title
  async search(searchTerm: string): Promise<NewsMedia[]> {
    const { data, error } = await supabase
      .from(Tables.NewsMedia)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Posted')
      .ilike('title', `%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching news media:', error);
      throw error;
    }

    return data || [];
  },

  // Get recent news media (limit)
  async getRecent(limit: number = 6): Promise<NewsMedia[]> {
    const { data, error } = await supabase
      .from(Tables.NewsMedia)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Posted')
      .order('event_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent news:', error);
      throw error;
    }

    return data || [];
  },
};
