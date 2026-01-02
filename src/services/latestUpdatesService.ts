import { supabase } from '@/utils/supabaseClient';
import Tables from '@/constants/tables';
import { LatestUpdate } from '@/types/supabase';

export const latestUpdatesService = {
  // Get all latest updates (only visible and posted)
  async getAll(): Promise<LatestUpdate[]> {
    const { data, error } = await supabase
      .from(Tables.LatestUpdates)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'New')
      .order('created_at', { ascending: false });
      console.log('Latest Updates Data:', data);

    if (error) {
      console.error('Error fetching latest updates:', error);
      throw error;
    }

    return data || [];
  },

  // Get single latest update by ID
  async getById(id: number): Promise<LatestUpdate | null> {
    const { data, error } = await supabase
      .from(Tables.LatestUpdates)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching latest update:', error);
      throw error;
    }

    return data;
  },

  // Create new latest update (admin only)
  async create(update: Partial<LatestUpdate>): Promise<LatestUpdate> {
    const { data, error } = await supabase
      .from(Tables.LatestUpdates)
      .insert([update])
      .select()
      .single();

    if (error) {
      console.error('Error creating latest update:', error);
      throw error;
    }

    return data;
  },

  // Update latest update (admin only)
  async update(id: number, update: Partial<LatestUpdate>): Promise<LatestUpdate> {
    const { data, error } = await supabase
      .from(Tables.LatestUpdates)
      .update(update)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating latest update:', error);
      throw error;
    }

    return data;
  },

  // Delete latest update (admin only)
  async delete(id: number): Promise<void> {
    const { error } = await supabase
      .from(Tables.LatestUpdates)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting latest update:', error);
      throw error;
    }
  },
};
