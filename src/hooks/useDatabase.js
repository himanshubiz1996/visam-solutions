import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export const usePortfolios = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('portfolios')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (dbError) throw dbError;
        setPortfolios(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  return { portfolios, loading, error };
};

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('services')
          .select('*')
          .eq('published', true);

        if (dbError) throw dbError;
        setServices(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (dbError) throw dbError;
        setBlogs(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};
