import Link from 'next/link'
import { ReactNode } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
}

export default function ServiceCard({ title, description, icon, href }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="text-primary-600 text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        href={href}
        className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center"
      >
        Mehr erfahren →
      </Link>
    </div>
  )
}

