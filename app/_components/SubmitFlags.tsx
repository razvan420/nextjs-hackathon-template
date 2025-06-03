'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface FlagFormData {
  name: string
  flag1: string
  flag2: string
  flag3: string
  flag4: string
}

interface ValidationErrors {
  name?: string
  flag1?: string
  flag2?: string
  flag3?: string
  flag4?: string
  general?: string
}

// Security constants
const MAX_SUBMISSIONS_PER_HOUR = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in milliseconds
const MAX_FLAG_LENGTH = 100
const MIN_NAME_LENGTH = 2
const MAX_NAME_LENGTH = 50

export default function SecureSubmitFlags() {
  const router = useRouter()
  const [formData, setFormData] = useState<FlagFormData>({
    name: '',
    flag1: '',
    flag2: '',
    flag3: '',
    flag4: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'rate-limited'>('idle')
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [remainingSubmissions, setRemainingSubmissions] = useState<number | null>(null)
  const [csrfToken, setCsrfToken] = useState<string>('')

  // Get CSRF token on component mount
  useState(() => {
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.token))
      .catch(err => console.error('Failed to get CSRF token:', err))
  })

  // Input sanitization
  const sanitizeInput = useCallback((input: string): string => {
    return input
      .trim()
      .replace(/[<>\"'&]/g, '') // Remove potential XSS characters
      .slice(0, MAX_FLAG_LENGTH) // Enforce length limit
  }, [])

  // Enhanced validation
  const validateForm = useCallback((): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.length < MIN_NAME_LENGTH) {
      newErrors.name = `Name must be at least ${MIN_NAME_LENGTH} characters`
    } else if (formData.name.length > MAX_NAME_LENGTH) {
      newErrors.name = `Name must not exceed ${MAX_NAME_LENGTH} characters`
    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(formData.name)) {
      newErrors.name = 'Name contains invalid characters'
    }

    // Flag validation (basic format check)
    const flagPattern = /^(flag\{|ctf\{|CTF\{|FLAG\{)/i
    Object.entries(formData).forEach(([key, value]) => {
      if (key.startsWith('flag') && value && !flagPattern.test(value)) {
        newErrors[key as keyof ValidationErrors] = 'Flag should start with flag{ or CTF{'
      }
    })

    return newErrors
  }, [formData])

  // Rate limiting check
  const checkRateLimit = useCallback((): boolean => {
    const submissions = JSON.parse(localStorage.getItem('flag-submissions') || '[]')
    const now = Date.now()
    
    // Filter submissions within the last hour
    const recentSubmissions = submissions.filter((timestamp: number) => 
      now - timestamp < RATE_LIMIT_WINDOW
    )
    
    setRemainingSubmissions(Math.max(0, MAX_SUBMISSIONS_PER_HOUR - recentSubmissions.length))
    
    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      return false
    }
    
    // Add current timestamp and update storage
    recentSubmissions.push(now)
    localStorage.setItem('flag-submissions', JSON.stringify(recentSubmissions))
    
    return true
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value)
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))
    
    // Clear field-specific errors on input
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }, [sanitizeInput, errors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Reset status
    setSubmitStatus('idle')
    setErrors({})
    
    // Validate form
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    // Check rate limiting
    if (!checkRateLimit()) {
      setSubmitStatus('rate-limited')
      return
    }
    
    // Check if at least one flag is provided
    const hasAnyFlag = Object.entries(formData)
      .filter(([key]) => key.startsWith('flag'))
      .some(([, value]) => value.trim())
    
    if (!hasAnyFlag) {
      setErrors({ general: 'Please submit at least one flag' })
      return
    }
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-flags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          ...formData,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }),
      })

      const responseData = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          flag1: '',
          flag2: '',
          flag3: '',
          flag4: ''
        })
        
        // Redirect after success
        setTimeout(() => {
          router.push('/?submitted=true')
        }, 3000)
      } else if (response.status === 429) {
        setSubmitStatus('rate-limited')
      } else {
        setSubmitStatus('error')
        setErrors({ general: responseData.error || 'Submission failed' })
      }
    } catch (error) {
      console.error('Error submitting flags:', error)
      setSubmitStatus('error')
      setErrors({ general: 'Network error. Please try again.' })
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

        {/* Rate Limit Warning */}
        {remainingSubmissions !== null && remainingSubmissions <= 2 && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
            <h3 className="font-semibold mb-1">⚠️ Rate Limit Warning</h3>
            <p className="text-sm">You have {remainingSubmissions} submission(s) remaining this hour.</p>
          </div>
        )}

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-6 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🎉 Flags Submitted Successfully!</h3>
            <p>Your submission has been received and sent to our team. Redirecting you back...</p>
          </div>
        )}

        {/* Rate Limited Message */}
        {submitStatus === 'rate-limited' && (
          <div className="mb-6 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🚫 Too Many Submissions</h3>
            <p>You've reached the maximum number of submissions ({MAX_SUBMISSIONS_PER_HOUR}) per hour. Please try again later.</p>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-6 p-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">❌ Submission Failed</h3>
            <p>{errors.general || 'There was an error submitting your flags. Please try again.'}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Name Field */}
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
                maxLength={MAX_NAME_LENGTH}
                autoComplete="name"
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 text-gray-900 text-lg transition-colors ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                placeholder="Enter your full name"
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Flag Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'flag1', label: 'Flag 1: Network/DNS', description: 'DNS records investigation' },
                { id: 'flag2', label: 'Flag 2: Crypto/XOR', description: 'XOR Marathon challenge' },
                { id: 'flag3', label: 'Flag 3: Web/Email', description: 'Hidden flag email challenge' },
                { id: 'flag4', label: 'Flag 4: Steganography', description: 'AI Espionage challenge' }
              ].map(({ id, label, description }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    id={id}
                    name={id}
                    value={formData[id as keyof FlagFormData]}
                    onChange={handleInputChange}
                    maxLength={MAX_FLAG_LENGTH}
                    autoComplete="off"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 text-gray-900 transition-colors ${
                      errors[id as keyof ValidationErrors]
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                    placeholder="flag{...} or CTF{...}"
                    aria-describedby={errors[id as keyof ValidationErrors] ? `${id}-error` : undefined}
                  />
                  {errors[id as keyof ValidationErrors] && (
                    <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
                      {errors[id as keyof ValidationErrors]}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">{description}</p>
                </div>
              ))}
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{errors.general}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/"
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-medium transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim() || submitStatus === 'rate-limited'}
                  className="flex-1 px-6 py-3 bg-[#262d3b] text-white rounded-lg hover:bg-[#1d242b] focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-medium transition-colors"
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

          {/* Security Information */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">🔒 Security & Privacy</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• All submissions are encrypted and securely transmitted</li>
              <li>• Rate limited to {MAX_SUBMISSIONS_PER_HOUR} submissions per hour per user</li>
              <li>• Input is sanitized to prevent malicious content</li>
              <li>• Your data is processed according to our privacy policy</li>
            </ul>
          </div>

          {/* Submission Tips */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Submission Tips</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• You can submit partial flags - leave empty fields blank</li>
              <li>• Flags typically follow the format: CTF&#123;flag&#125; or flag&#123;flag&#125;</li>
              <li>• Double-check your flags before submitting</li>
              <li>• Your submission will be emailed to our team</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}