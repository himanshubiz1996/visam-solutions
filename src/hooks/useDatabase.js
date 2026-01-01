import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useDatabase = (table, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    select = '*',
    filter = {},
    orderBy = { column: 'created_at', ascending: false },
    limit = null,
    single = false
  } = options;

  useEffect(() => {
    fetchData();
  }, [table]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from(table)
        .select(select)
        .eq('published', true);

      // Apply filters
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      // Apply ordering
      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending });
      }

      // Apply limit
      if (limit) {
        query = query.limit(limit);
      }

      // Execute query
      const { data: result, error: err } = single 
        ? await query.single() 
        : await query;

      if (err) throw err;

      setData(result);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${table}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchData };
};

// Specific hooks for each table
export const usePortfolios = (options) => useDatabase('portfolios', options);
export const useServices = (options) => useDatabase('services', options);
export const useBlogs = (options) => useDatabase('blogs', options);

// Hook for single item by slug
export const usePortfolioBySlug = (slug) => {
  return useDatabase('portfolios', {
    filter: { slug },
    single: true
  });
};

export const useServiceBySlug = (slug) => {
  return useDatabase('services', {
    filter: { slug },
    single: true
  });
};

export const useBlogBySlug = (slug) => {
  return useDatabase('blogs', {
    filter: { slug },
    single: true
  });
};
