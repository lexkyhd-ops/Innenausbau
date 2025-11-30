'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const [isMaintenanceEnabled, setIsMaintenanceEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isToggling, setIsToggling] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkMaintenanceStatus()
  }, [])

  const checkMaintenanceStatus = async () => {
    try {
      const response = await fetch('/api/admin/maintenance')
      if (response.status === 401) {
        // Not authenticated, redirect to maintenance page
        router.push('/maintenance')
        return
      }
      const data = await response.json()
      setIsMaintenanceEnabled(data.enabled)
    } catch (error) {
      console.error('Error checking maintenance status:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMaintenance = async () => {
    setIsToggling(true)
    setMessage('')

    try {
      const response = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled: !isMaintenanceEnabled }),
      })

      if (response.status === 401) {
        router.push('/maintenance')
        return
      }

      const data = await response.json()

      if (data.success) {
        setIsMaintenanceEnabled(data.enabled)
        setMessage(data.message)
        setTimeout(() => setMessage(''), 3000)
      } else {
        // Show the message from API (might contain instructions for Vercel)
        setMessage(data.message || data.error || 'Fehler beim Ändern des Wartungsmodus')
        if (data.note) {
          setTimeout(() => setMessage(data.note), 4000)
        }
      }
    } catch (error) {
      setMessage('Ein Fehler ist aufgetreten')
    } finally {
      setIsToggling(false)
    }
  }

  const logout = () => {
    document.cookie = 'admin-session=; path=/; max-age=0'
    router.push('/maintenance')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Lädt...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin-Panel</h1>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Abmelden
            </button>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Wartungsmodus
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Aktivieren Sie den Wartungsmodus, um die Website für Besucher zu sperren.
                  </p>
                </div>
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      isMaintenanceEnabled
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {isMaintenanceEnabled ? 'Aktiviert' : 'Deaktiviert'}
                  </span>
                </div>
              </div>

              {message && (
                <div
                  className={`mb-4 p-3 rounded-lg text-sm ${
                    message.includes('Fehler')
                      ? 'bg-red-50 text-red-700'
                      : 'bg-green-50 text-green-700'
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                onClick={toggleMaintenance}
                disabled={isToggling}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isMaintenanceEnabled
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-red-600 text-white hover:bg-red-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isToggling
                  ? 'Wird geändert...'
                  : isMaintenanceEnabled
                  ? 'Wartungsmodus deaktivieren'
                  : 'Wartungsmodus aktivieren'}
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Hinweis</h3>
              <p className="text-sm text-yellow-700">
                Wenn der Wartungsmodus aktiviert ist, können nur Administratoren mit dem korrekten Passwort auf die Website zugreifen.
                Alle anderen Besucher werden zur Wartungsseite weitergeleitet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

