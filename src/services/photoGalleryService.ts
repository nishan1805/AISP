import { supabase } from '@/utils/supabaseClient';
import Tables from '@/constants/tables';
import { PhotoGallery } from '@/types/supabase';

export const photoGalleryService = {
  // Get all photo galleries (only visible and posted)
  async getAll(): Promise<PhotoGallery[]> {
    const { data, error } = await supabase
      .from(Tables.PhotoGallery)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Posted')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching photo galleries:', error);
      throw error;
    }

    return data || [];
  },

  // Get single photo gallery by ID or gallery_id
  async getById(id: string): Promise<PhotoGallery | null> {
    const { data, error } = await supabase
      .from(Tables.PhotoGallery)
      .select('*')
      .or(`id.eq.${id},gallery_id.eq.${id}`)
      .eq('visibility', true)
      .eq('status', 'Posted')
      .single();

    if (error) {
      console.error('Error fetching photo gallery:', error);
      return null;
    }

    return data;
  },

  // Filter galleries by year and month
  async filterByDate(year?: number, month?: string): Promise<PhotoGallery[]> {
    let query = supabase
      .from(Tables.PhotoGallery)
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
      console.error('Error filtering photo galleries:', error);
      throw error;
    }

    return data || [];
  },

  // Search galleries by title
  async search(searchTerm: string): Promise<PhotoGallery[]> {
    const { data, error } = await supabase
      .from(Tables.PhotoGallery)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Posted')
      .ilike('title', `%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching photo galleries:', error);
      throw error;
    }

    return data || [];
  },
};
