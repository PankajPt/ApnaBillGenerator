// ContactPage.jsx
import { useState, useEffect } from 'react';
import { FaGithub, FaLink, FaUsers, FaCode } from 'react-icons/fa';

export const ContactPage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://api.github.com/users/pankajpt');
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="animate-pulse">Loading GitHub profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact & Support</h1>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={profile.avatar_url}
              alt="GitHub Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-600"
            />
            
            <div className="flex-1">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <FaGithub className="text-blue-400" />
                {profile.name || profile.login}
              </h2>
              
              <p className="text-gray-300 mt-2">
                {profile.bio || 'Full-stack developer focused on building efficient web applications.'}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-400" />
                  <span>{profile.followers} followers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCode className="text-blue-400" />
                  <span>{profile.public_repos} public repos</span>
                </div>
              </div>

              <a
                href={profile.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <FaLink />
                Visit GitHub Profile
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Support Channels</h2>
          <div className="space-y-2 text-gray-300">
            <p>📧 Email: support@billmanager.com</p>
            <p>📞 Helpline: +1 (555) 123-4567</p>
            <p>🕒 Support Hours: Mon-Fri 9AM-5PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
};