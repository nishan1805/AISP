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
      .in('status', ['Posted', 'New'])
      .order('event_date', { ascending: false });

    if (error) {
      console.error('Error fetching news media:', error);
      throw error;
    }

    return data || [];
  },

  // Get single news media by ID or post_id
  async getById(id: string): Promise<NewsMedia | null> {
    const { data, error } = await supabase
      .from(Tables.NewsMedia)
      .select('*')
      .or(`id.eq.${id},post_id.eq.${id}`)
      .eq('visibility', true)
      .in('status', ['Posted', 'New'])
      .single();

    if (error) {
      console.error('Error fetching news media:', error);
      return null;
    }

    return data;
  },

  // Get recent news media (limit)
  async getRecent(limit: number = 6): Promise<NewsMedia[]> {
    const { data, error } = await supabase
      .from(Tables.NewsMedia)
      .select('*')
      .eq('visibility', true)
      .in('status', ['Posted', 'New'])
      .order('event_date', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching recent news:', error);
      throw error;
    }

    return data || [];
  },

  // Group media posts by title
  async getAllGroupedByTitle(): Promise<Record<string, NewsMedia[]>> {
    const mediaItems = await this.getAll();

    return mediaItems.reduce<Record<string, NewsMedia[]>>((acc, item) => {
      const key = item.title || "Untitled";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  },
};
