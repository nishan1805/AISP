import { supabase } from '@/utils/supabaseClient';
import Tables from '@/constants/tables';
import { Job } from '@/types/supabase';

export const jobsService = {
  // Get all open jobs (only visible)
  async getAll(): Promise<Job[]> {
    const { data, error } = await supabase
      .from(Tables.Jobs)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Open')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }

    return data || [];
  },

  // Get single job by ID or job_id
  async getById(id: string): Promise<Job | null> {
    const { data, error } = await supabase
      .from(Tables.Jobs)
      .select('*')
      .or(`id.eq.${id},job_id.eq.${id}`)
      .eq('visibility', true)
      .single();

    if (error) {
      console.error('Error fetching job:', error);
      return null;
    }

    return data;
  },

  // Search jobs by title or subject
  async search(searchTerm: string): Promise<Job[]> {
    const { data, error } = await supabase
      .from(Tables.Jobs)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Open')
      .or(`title.ilike.%${searchTerm}%,subject.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }

    return data || [];
  },
};
