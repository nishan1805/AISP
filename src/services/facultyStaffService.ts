import { supabase } from '@/utils/supabaseClient';
import Tables from '@/constants/tables';
import { FacultyStaff } from '@/types/supabase';

export const facultyStaffService = {
  // Get all faculty/staff by category
  async getByCategory(category: 'Teaching' | 'Non-Teaching'): Promise<FacultyStaff[]> {
    const { data, error } = await supabase
      .from(Tables.FacultyStaff)
      .select('*')
      .eq('visibility', true)
      .eq('category', category)
      .order('name', { ascending: true });
      console.log(`Faculty/Staff Data for category ${category}:`, data);

    if (error) {
      console.error('Error fetching faculty/staff:', error);
      throw error;
    }

    return data || [];
  },

  // Get all faculty/staff
  async getAll(): Promise<FacultyStaff[]> {
    const { data, error } = await supabase
      .from(Tables.FacultyStaff)
      .select('*')
      .eq('visibility', true)
      .order('category', { ascending: true })
      .order('name', { ascending: true});

    if (error) {
      console.error('Error fetching all faculty/staff:', error);
      throw error;
    }

    return data || [];
  },

  // Get single faculty/staff by ID or doc_id
  async getById(id: string): Promise<FacultyStaff | null> {
    const { data, error } = await supabase
      .from(Tables.FacultyStaff)
      .select('*')
      .or(`id.eq.${id},doc_id.eq.${id}`)
      .eq('visibility', true)
      .single();

    if (error) {
      console.error('Error fetching faculty/staff member:', error);
      return null;
    }

    return data;
  },
};
