// src/context/SupabaseContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseContext = createContext();

export function SupabaseProvider({ children, meta }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to save order to database
  const saveOrder = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.
      from('orders').
      insert([orderData]).
      select().
      single();

      if (error) throw error;

      return { data, error: null };
    } catch (err) {
      console.error('Error saving order:', err);
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Function to send email via edge function
  const sendOrderEmail = async (orderData) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Chyba při odesílání emailu');
      }

      return { data: result, error: null };
    } catch (err) {
      console.error('Error sending email:', err);
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Function to submit complete order (save + send email)
  const submitOrder = async (formData, calculatedCost) => {
    const orderData = {
      customer_name: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      surface_type: formData.surfaceType,
      repair_level: formData.repairLevel,
      paint_provision: formData.paintProvision,
      furniture_handling: formData.furnitureHandling,
      empty_space: formData.emptySpace,
      carpet_presence: formData.carpetPresence,
      space_type: formData.spaceType,
      total_area: parseFloat(formData.totalArea) || 0,
      room_count: parseInt(formData.roomCount) || 0,
      ceiling_height: parseFloat(formData.ceilingHeight) || 0,
      preferred_date: formData.preferredDate,
      additional_info: formData.additionalInfo,
      calculated_cost: calculatedCost,
      created_at: new Date().toISOString()
    };

    // Save to database first
    const saveResult = await saveOrder(orderData);
    if (saveResult.error) {
      return saveResult;
    }

    // Send email notification
    const emailResult = await sendOrderEmail({
      ...orderData,
      order_id: saveResult.data.id
    });

    if (emailResult.error) {
      console.error('Email sending failed, but order was saved:', emailResult.error);
      // Don't return error here as order was saved successfully
    }

    return { data: saveResult.data, error: null };
  };

  const value = {
    saveOrder,
    sendOrderEmail,
    submitOrder,
    loading,
    error,
    setError
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>);

}

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
}

export default SupabaseContext;