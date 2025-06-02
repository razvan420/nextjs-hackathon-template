'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export default function CookiesConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookies-consent')
    if (!consent) {
      // Delay showing banner slightly for better UX
      setTimeout(() => setShowBanner(true), 1000)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    setPreferences(allAccepted)
    localStorage.setItem('cookies-consent', JSON.stringify(allAccepted))
    localStorage.setItem('cookies-consent-date', new Date().toISOString())
    setShowBanner(false)
    setShowPreferences(false)
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    setPreferences(necessaryOnly)
    localStorage.setItem('cookies-consent', JSON.stringify(necessaryOnly))
    localStorage.setItem('cookies-consent-date', new Date().toISOString())
    setShowBanner(false)
    setShowPreferences(false)
  }

  const savePreferences = () => {
    localStorage.setItem('cookies-consent', JSON.stringify(preferences))
    localStorage.setItem('cookies-consent-date', new Date().toISOString())
    setShowBanner(false)
    setShowPreferences(false)
  }

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  if (!showBanner) return null

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1d242b] border-t-4 border-[#37c598] text-white p-6 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <svg className="w-6 h-6 mr-3 text-[#37c598]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold">🍪 We Value Your Privacy</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                This CTF platform uses cookies to enhance your experience, analyze performance, and remember your preferences. 
                We process your data to improve security challenges and track your progress. 
                <Link href="/privacy-policy" className="text-[#37c598] hover:text-blue-300 underline ml-1">
                  Learn more about our data processing
                </Link>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors text-sm font-medium"
              >
                Customize
              </button>
              <button
                onClick={acceptNecessary}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                Necessary Only
              </button>
              <button
                onClick={acceptAll}
                className="px-6 py-2 bg-[#37c598] text-white rounded-lg hover:bg-[#2ea080] transition-colors text-sm font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Cookie Preferences</h2>
                <button 
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-600 mb-6">
                Choose which cookies you want to accept. You can change these settings at any time.
              </p>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">🔒 Necessary Cookies</h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Always Active
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Essential for the website to function properly. These include security, authentication, and basic functionality cookies.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">📊 Analytics Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#37c598]"></div>
                    </label>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Help us understand how you use our CTF platform to improve challenges and user experience.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">⚙️ Functional Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => handlePreferenceChange('functional')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#37c598]"></div>
                    </label>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Remember your preferences, settings, and progress in CTF challenges for a personalized experience.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">📢 Marketing Cookies</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => handlePreferenceChange('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#37c598]"></div>
                    </label>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Show you relevant CTF events, competitions, and cybersecurity content based on your interests.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={savePreferences}
                  className="flex-1 px-4 py-3 bg-[#37c598] text-white rounded-lg hover:bg-[#2ea080] font-medium"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}