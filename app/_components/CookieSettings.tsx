'use client'

import { useState, useEffect } from 'react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export default function CookieSettings() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  })
  const [showSettings, setShowSettings] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookies-consent')
    if (consent) {
      setPreferences(JSON.parse(consent))
      setHasConsent(true)
    }
  }, [])

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return
    const newPreferences = {
      ...preferences,
      [key]: !preferences[key]
    }
    setPreferences(newPreferences)
    localStorage.setItem('cookies-consent', JSON.stringify(newPreferences))
    localStorage.setItem('cookies-consent-date', new Date().toISOString())
  }

  const clearAllCookies = () => {
    localStorage.removeItem('cookies-consent')
    localStorage.removeItem('cookies-consent-date')
    setHasConsent(false)
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    })
    // Reload page to show consent banner again
    window.location.reload()
  }

  if (!hasConsent) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          🍪 No cookie preferences found. The consent banner will appear on your next visit.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">🍪 Cookie Settings</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-[#37c598] hover:text-blue-600 font-medium"
        >
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </button>
      </div>

      {/* Current Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-600 font-semibold text-sm">Necessary</div>
          <div className="text-green-800 text-lg">✓</div>
        </div>
        <div className={`text-center p-3 border rounded-lg ${preferences.analytics ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className={`font-semibold text-sm ${preferences.analytics ? 'text-green-600' : 'text-gray-600'}`}>Analytics</div>
          <div className={`text-lg ${preferences.analytics ? 'text-green-800' : 'text-gray-400'}`}>
            {preferences.analytics ? '✓' : '✗'}
          </div>
        </div>
        <div className={`text-center p-3 border rounded-lg ${preferences.functional ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className={`font-semibold text-sm ${preferences.functional ? 'text-green-600' : 'text-gray-600'}`}>Functional</div>
          <div className={`text-lg ${preferences.functional ? 'text-green-800' : 'text-gray-400'}`}>
            {preferences.functional ? '✓' : '✗'}
          </div>
        </div>
        <div className={`text-center p-3 border rounded-lg ${preferences.marketing ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
          <div className={`font-semibold text-sm ${preferences.marketing ? 'text-green-600' : 'text-gray-600'}`}>Marketing</div>
          <div className={`text-lg ${preferences.marketing ? 'text-green-800' : 'text-gray-400'}`}>
            {preferences.marketing ? '✓' : '✗'}
          </div>
        </div>
      </div>

      {/* Detailed Settings */}
      {showSettings && (
        <div className="space-y-4 mb-6">
          {/* Analytics Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">📊 Analytics Cookies</h4>
              <p className="text-gray-600 text-sm">Help us improve the CTF platform</p>
            </div>
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

          {/* Functional Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">⚙️ Functional Cookies</h4>
              <p className="text-gray-600 text-sm">Remember your preferences and settings</p>
            </div>
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

          {/* Marketing Toggle */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-semibold text-gray-800">📢 Marketing Cookies</h4>
              <p className="text-gray-600 text-sm">Show relevant CTF events and content</p>
            </div>
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
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={clearAllCookies}
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          🗑️ Reset All Cookie Preferences
        </button>
        <a
          href="/privacy-policy"
          className="flex-1 px-4 py-3 bg-[#37c598] text-white rounded-lg hover:bg-[#2ea080] transition-colors font-medium text-center"
        >
          📋 View Privacy Policy
        </a>
      </div>

      {/* Information */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">ℹ️ Information</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Necessary cookies are always active for basic functionality</li>
          <li>• Changes are saved automatically</li>
          <li>• You can update your preferences at any time</li>
          <li>• Contact us at contact@secforit.ro for data requests</li>
        </ul>
      </div>
    </div>
  )
}