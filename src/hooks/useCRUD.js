import { useState } from 'react';
import { supabase } from '../lib/supabase';

export const useCRUD = (table) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create
  const create = async (data) => {
    setLoading(true);
    setError(null);

    const { data: result, error: err } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single();

    setLoading(false);

    if (err) {
      setError(err.message);
      return { data: null, error: err };
    }

    return { data: result, error: null };
  };

  // Read All
  const getAll = async (options = {}) => {
    setLoading(true);
    setError(null);

    let query = supabase.from(table).select('*');

    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending || false,
      });
    }

    if (options.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error: err } = await query;

    setLoading(false);

    if (err) {
      setError(err.message);
      return { data: null, error: err };
    }

    return { data, error: null };
  };

  // Read One
  const getOne = async (id) => {
    setLoading(true);
    setError(null);

    const { data, error: err } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single();

    setLoading(false);

    if (err) {
      setError(err.message);
      return { data: null, error: err };
    }

    return { data, error: null };
  };

  // Update
  const update = async (id, data) => {
    setLoading(true);
    setError(null);

    const { data: result, error: err } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    setLoading(false);

    if (err) {
      setError(err.message);
      return { data: null, error: err };
    }

    return { data: result, error: null };
  };

  // Delete
  const remove = async (id) => {
    setLoading(true);
    setError(null);

    const { error: err } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    setLoading(false);

    if (err) {
      setError(err.message);
      return { error: err };
    }

    return { error: null };
  };

  // Toggle Published Status
  const togglePublished = async (id, currentStatus) => {
    return update(id, { published: !currentStatus });
  };

  return {
    loading,
    error,
    create,
    getAll,
    getOne,
    update,
    remove,
    togglePublished,
  };
};
