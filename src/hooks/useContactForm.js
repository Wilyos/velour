import { useState } from 'react';
import { apiRequest } from '../utils/api';

export const useContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    documentNumber: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      documentNumber: '',
      email: '',
      phone: '',
      message: ''
    });
    setSubmitStatus(null);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.fullName || !formData.documentNumber || !formData.email || !formData.phone || !formData.message) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await apiRequest('/api/contacts/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          documentNumber: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error enviando formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    handleInputChange,
    submitForm,
    resetForm
  };
};
