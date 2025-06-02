'use client'

import { useState } from 'react'
import Link from 'next/link'

interface FlagFormData {
  name: string
  flag1: string
  flag2: string
  flag3: string
  flag4: string
}

export default function SubmitFlags() {
  const [formData, setFormData] = useState<FlagFormData>({
    name: '',
    flag1: '',
    flag2: '',
    flag3: '',
    flag4: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit-flags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          flag1: '',
          flag2: '',
          flag3: '',
          flag4: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting flags:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='page space'>
      <div className='w-[90%] max-w-2xl'>
        <div className="flex items-center justify-between mb-8">
          <h1 className='title mb-0'>Submit Your Flags</h1>
          <Link 
            href="/" 
            className="text-gray-600 hover:text-gray-800 text-lg"
          >
            ← Back to CTF
          </Link>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-6 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🎉 Flags Submitted Successfully!</h3>
            <p>Your submission has been received and sent to our team. Good luck!</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">❌ Submission Failed</h3>
            <p>There was an error submitting your flags. Please try again.</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="flag1" className="block text-lg font-medium text-gray-700 mb-2">
                  Flag 1: Network/DNS
                </label>
                <input
                  type="text"
                  id="flag1"
                  name="flag1"
                  value={formData.flag1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="CTF{...}"
                />
                <p className="text-sm text-gray-500 mt-1">DNS records investigation</p>
              </div>

              <div>
                <label htmlFor="flag2" className="block text-lg font-medium text-gray-700 mb-2">
                  Flag 2: Crypto/XOR
                </label>
                <input
                  type="text"
                  id="flag2"
                  name="flag2"
                  value={formData.flag2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="CTF{...}"
                />
                <p className="text-sm text-gray-500 mt-1">XOR Marathon challenge</p>
              </div>

              <div>
                <label htmlFor="flag3" className="block text-lg font-medium text-gray-700 mb-2">
                  Flag 3: Web/Email
                </label>
                <input
                  type="text"
                  id="flag3"
                  name="flag3"
                  value={formData.flag3}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="CTF{...}"
                />
                <p className="text-sm text-gray-500 mt-1">Hidden flag email challenge</p>
              </div>

              <div>
                <label htmlFor="flag4" className="block text-lg font-medium text-gray-700 mb-2">
                  Flag 4: Steganography
                </label>
                <input
                  type="text"
                  id="flag4"
                  name="flag4"
                  value={formData.flag4}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="CTF{...}"
                />
                <p className="text-sm text-gray-500 mt-1">AI Espionage challenge</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-medium"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name}
                  className="flex-1 px-6 py-3 bg-[#262d3b] text-white rounded-lg hover:bg-[#1d242b] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    'Submit All Flags'
                  )}
                </button>
              </div>
            </div>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Submission Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You can submit partial flags - leave empty fields blank</li>
              <li>• Flags typically follow the format: CTF&#123;flag&#125;</li>
              <li>• Double-check your flags before submitting</li>
              <li>• Your submission will be emailed to our team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}