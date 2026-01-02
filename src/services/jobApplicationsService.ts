import { supabase } from '@/utils/supabaseClient';
import Tables from '@/constants/tables';
import { JobApplication } from '@/types/supabase';

export const jobApplicationsService = {
  // Submit a new job application
  async submit(application: Omit<JobApplication, 'id' | 'created_at' | 'updated_at' | 'applied_on' | 'status' | 'applicant_sno' | 'notes'>): Promise<JobApplication> {
    const { data, error } = await supabase
      .from(Tables.JobApplications)
      .insert([{
        ...application,
        status: 'New',
        applied_on: new Date().toISOString().split('T')[0],
      }])
      .select()
      .single();

    if (error) {
      console.error('Error submitting job application:', error);
      throw error;
    }

    return data;
  },

  // Get all applications for a specific job (admin only)
  async getByJobId(jobId: number): Promise<JobApplication[]> {
    const { data, error } = await supabase
      .from(Tables.JobApplications)
      .select('*')
      .eq('job_id', jobId)
      .order('applied_on', { ascending: false });

    if (error) {
      console.error('Error fetching job applications:', error);
      throw error;
    }

    return data || [];
  },

  // Update application status (admin only)
  async updateStatus(id: number, status: JobApplication['status'], notes?: string): Promise<JobApplication> {
    const { data, error } = await supabase
      .from(Tables.JobApplications)
      .update({ status, notes })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating application status:', error);
      throw error;
    }

    return data;
  },
};
