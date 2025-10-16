'use client';

import { useState } from 'react';

interface ContactFormProps {
  locale: string;
}

export default function ContactFormClient({ locale }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      console.log('📧 Sending contact form...', formData);
      
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('📧 Response:', data);

      if (!res.ok) {
        console.error('❌ Error response:', data);
        throw new Error(data.error || 'Failed to send message');
      }

      console.log('✅ Contact form sent successfully!');
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        purpose: '',
        message: '',
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ECEFF1] rounded-lg p-8">
      <h3 className="text-2xl font-semibold text-[#0B1B33] mb-4">
        {locale === 'el' ? 'Στείλτε μας μήνυμα' : 'Send us a message'}
      </h3>
      
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            ✓ {locale === 'el' ? 'Το μήνυμά σας στάλθηκε επιτυχώς!' : 'Your message has been sent successfully!'}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder={locale === 'el' ? 'Όνομα' : 'Name'}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#F9C80E] focus:outline-none"
        />
        
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#F9C80E] focus:outline-none"
        />

        <input
          type="tel"
          placeholder={locale === 'el' ? 'Τηλέφωνο (προαιρετικό)' : 'Phone (optional)'}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#F9C80E] focus:outline-none"
        />
        
        <select
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#F9C80E] focus:outline-none text-gray-700"
        >
          <option value="">{locale === 'el' ? 'Σκοπός' : 'Purpose'}</option>
          <option value="booking">{locale === 'el' ? 'Κράτηση' : 'Booking'}</option>
          <option value="inquiry">{locale === 'el' ? 'Γενική Πληροφορία' : 'General Inquiry'}</option>
          <option value="support">{locale === 'el' ? 'Υποστήριξη' : 'Support'}</option>
        </select>
        
        <textarea
          placeholder={locale === 'el' ? 'Μήνυμα' : 'Message'}
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="w-full p-3 rounded border-2 border-gray-300 focus:border-[#F9C80E] focus:outline-none"
        ></textarea>
        
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading 
            ? (locale === 'el' ? 'Αποστολή...' : 'Sending...') 
            : (locale === 'el' ? 'Αποστολή' : 'Send')
          }
        </button>
      </form>
    </div>
  );
}

