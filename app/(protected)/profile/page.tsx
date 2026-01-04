// app/(protected)/profile/page.tsx
import { auth } from '@/app/auth';
import { ProfileForm } from './profile-form';
import { PasswordForm } from './password-form';

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information and security</p>
      </div>

      <div className="space-y-6">
        {/* Profile Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
              <p className="text-sm text-gray-600">Update your personal details</p>
            </div>
          </div>
          <ProfileForm user={session!.user} />
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
              <p className="text-sm text-gray-600">Update your password to keep your account secure</p>
            </div>
          </div>
          <PasswordForm />
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-200">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-600">Danger Zone</h2>
              <p className="text-sm text-gray-600">Irreversible and destructive actions</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold shadow-md hover:shadow-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}