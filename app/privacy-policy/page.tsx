import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className='page space'>
      <div className='w-[90%] max-w-4xl'>
        <div className="flex items-center justify-between mb-8">
          <h1 className='title mb-0'>Privacy Policy & Data Processing</h1>
          <Link 
            href="/privacy-policy" 
            className="text-gray-600 hover:text-gray-800 text-lg"
          >
            ← Back to CTF
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">🔒 Data Protection & Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              At <strong>Stefanini CTF (SECFORIT)</strong>, we take your privacy seriously. This policy explains how we collect, 
              use, and protect your personal data when you participate in our Capture The Flag challenges.
            </p>
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-blue-800">
                <strong>Last Updated:</strong> June 2025 | <strong>Contact:</strong> contact@secforit.ro
              </p>
            </div>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">📊 Data We Collect</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#37c598] mb-3">🎯 CTF Participation Data</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Your name and contact information</li>
                  <li>• Flag submissions and timestamps</li>
                  <li>• Challenge progress and scores</li>
                  <li>• IP addresses for security purposes</li>
                  <li>• Browser information (User-Agent)</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#37c598] mb-3">🍪 Cookies & Tracking</h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Essential cookies for site functionality</li>
                  <li>• Analytics cookies (with your consent)</li>
                  <li>• Preference cookies for personalization</li>
                  <li>• Session data for authentication</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Data */}
          <section>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">⚙️ How We Use Your Data</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#37c598] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                <div>
                  <h4 className="font-semibold text-gray-800">CTF Challenge Management</h4>
                  <p className="text-gray-600 text-sm">Track your progress, validate flag submissions, and maintain leaderboards.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#37c598] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Security & Anti-Fraud</h4>
                  <p className="text-gray-600 text-sm">Prevent cheating, detect suspicious activity, and ensure fair competition.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#37c598] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Platform Improvement</h4>
                  <p className="text-gray-600 text-sm">Analyze challenge difficulty, improve user experience, and develop new content.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#37c598] rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">4</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Communication</h4>
                  <p className="text-gray-600 text-sm">Send important updates, results, and information about future events.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Basis */}
          <section>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">⚖️ Legal Basis for Processing</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Legitimate Interest</h4>
                <p className="text-green-700 text-sm">Operating the CTF platform and ensuring fair competition.</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Consent</h4>
                <p className="text-blue-700 text-sm">Analytics, marketing, and optional data processing.</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Contract Performance</h4>
                <p className="text-purple-700 text-sm">Delivering the CTF experience you signed up for.</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">🛡️ Your Data Rights</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">📋 Access & Portability</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Request a copy of your data</li>
                    <li>• Download your CTF progress</li>
                    <li>• See how we use your information</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">✏️ Correction & Deletion</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Update incorrect information</li>
                    <li>• Request data deletion</li>
                    <li>• Withdraw consent anytime</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#37c598] bg-opacity-10 border border-[#37c598] rounded-lg">
                <p className="text-gray-800 text-sm">
                  <strong>📧 Exercise Your Rights:</strong> Contact us at 
                  <a href="mailto:contact@secforit.ro" className="text-[#37c598] hover:text-blue-600 font-semibold ml-1">
                    contact@secforit.ro
                  </a> to request access, correction, or deletion of your data.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">🔐 Data Security</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#37c598] mb-3">Technical Measures</h4>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li>• 🔒 HTTPS encryption for all data transmission</li>
                  <li>• 🛡️ Secure authentication systems</li>
                  <li>• 💾 Regular security backups</li>
                  <li>• 🚫 Access controls and monitoring</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#37c598] mb-3">Organizational Measures</h4>
                <ul className="text-gray-700 text-sm space-y-2">
                  <li>• 👥 Limited access to personal data</li>
                  <li>• 📚 Regular security training</li>
                  <li>• 📋 Data processing documentation</li>
                  <li>• 🚨 Incident response procedures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">⏰ Data Retention</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">CTF Participation Data</span>
                <span className="text-[#37c598] font-semibold">2 years</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">Analytics Data</span>
                <span className="text-[#37c598] font-semibold">26 months</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">Session Data</span>
                <span className="text-[#37c598] font-semibold">Until logout</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-800">Marketing Preferences</span>
                <span className="text-[#37c598] font-semibold">Until withdrawn</span>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-bold text-[#1B365D] mb-4">📞 Contact & Complaints</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#37c598] bg-opacity-10 border border-[#37c598] rounded-lg p-6">
                <h4 className="font-semibold text-[#37c598] mb-3">Data Controller</h4>
                <div className="text-gray-700 text-sm space-y-2">
                  <p><strong>SECFORIT</strong></p>
                  <p>Lisman Adrian-Razvan</p>
                  <p>📧 contact@secforit.ro</p>
                  <p>🌐 https://secforit.ro</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Supervisory Authority</h4>
                <div className="text-blue-700 text-sm space-y-2">
                  <p>If you're not satisfied with our response, you can file a complaint with your local data protection authority.</p>
                  <p className="font-medium">🇷🇴 Romanian Data Protection Authority (ANSPDCP)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-gray-500 text-sm">
            <p>© 2025 SECFORIT - All rights reserved. This privacy policy is effective as of June 2025.</p>
          </div>
        </div>
      </div>
    </div>
  )
}