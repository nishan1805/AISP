import { supabase } from '@/utils/supabaseClient';
import Tables from '@/constants/tables';
import { MandatoryDisclosure } from '@/types/supabase';

export const mandatoryDisclosureService = {
  // Get all mandatory disclosures (only visible and posted)
  async getAll(): Promise<MandatoryDisclosure[]> {
    const { data, error } = await supabase
      .from(Tables.MandatoryDisclosure)
      .select('*')
      .eq('visibility', true)
      .eq('status', 'Posted')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching mandatory disclosures:', error);
      throw error;
    }

    return data || [];
  },

  // Get single mandatory disclosure by ID or doc_id
  async getById(id: string): Promise<MandatoryDisclosure | null> {
    const { data, error } = await supabase
      .from(Tables.MandatoryDisclosure)
      .select('*')
      .or(`id.eq.${id},doc_id.eq.${id}`)
      .eq('visibility', true)
      .eq('status', 'Posted')
      .single();

    if (error) {
      console.error('Error fetching mandatory disclosure:', error);
      return null;
    }

    return data;
  },
};
