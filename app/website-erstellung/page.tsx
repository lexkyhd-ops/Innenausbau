import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import {
  SITE_NAME,
  WEBDESIGN_REFERENCE_PROJECTS,
  WEBDESIGN_STUDIO_EMAIL,
  WEBDESIGN_STUDIO_EMAIL_BUTTON_NAME,
  WEBDESIGN_STUDIO_HIGHLIGHTS,
  WEBDESIGN_STUDIO_INITIALS,
  WEBDESIGN_STUDIO_INTRO,
  WEBDESIGN_STUDIO_NAME,
  WEBDESIGN_STUDIO_PHONE_DISPLAY,
  WEBDESIGN_STUDIO_PHONE_E164,
  WEBDESIGN_STUDIO_PORTRAIT_PATH,
  WEBDESIGN_STUDIO_TAGLINE,
  WEBDESIGN_STUDIO_WEBSITE,
} from '@/lib/site'

export const metadata: Metadata = {
  title: `Website-Erstellung – ${WEBDESIGN_STUDIO_NAME} · ${SITE_NAME}`,
  description: `${SITE_NAME}: Konzeption und technische Umsetzung dieses Webauftritts (${WEBDESIGN_STUDIO_NAME}) · Handwerk und Gewerbe in Wien.`,
  robots: { index: true, follow: true },
}

export default function WebsiteErstellungPage() {
  const hasWebsite = WEBDESIGN_STUDIO_WEBSITE.trim().length > 0
  const hasEmail = WEBDESIGN_STUDIO_EMAIL.trim().length > 0
  const hasPhone = WEBDESIGN_STUDIO_PHONE_E164.trim().length > 0
  const portraitPath = WEBDESIGN_STUDIO_PORTRAIT_PATH.trim()

  return (
    <div className="py-12 sm:py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <p className="mb-6 text-sm font-medium uppercase tracking-wide text-primary-600">
          Gestaltung dieser Website · {SITE_NAME}
        </p>

        <header className="mb-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div
            className={`relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl shadow-lg shadow-primary-900/25 ring-4 ring-white sm:h-36 sm:w-36 ${
              portraitPath ? 'bg-gray-100' : 'bg-gradient-to-br from-primary-600 to-primary-800'
            }`}
          >
            {portraitPath ? (
              <div className="absolute inset-0">
                <Image
                  src={portraitPath}
                  alt={`${WEBDESIGN_STUDIO_NAME}`}
                  fill
                  draggable={false}
                  className="pointer-events-none object-cover object-center"
                  sizes="(max-width: 640px) 128px, 144px"
                  priority
                />
              </div>
            ) : (
              <div
                className="flex h-full w-full items-center justify-center text-3xl font-bold tracking-tight text-white sm:text-4xl"
                aria-hidden
              >
                {WEBDESIGN_STUDIO_INITIALS}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800 md:text-4xl">{WEBDESIGN_STUDIO_NAME}</h1>
            <p className="mt-2 text-base font-medium text-primary-700 md:text-lg">{WEBDESIGN_STUDIO_TAGLINE}</p>
          </div>
        </header>

        <p className="text-lg leading-relaxed text-gray-700">{WEBDESIGN_STUDIO_INTRO}</p>

        <ul className="my-10 space-y-3 rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-primary-50 p-6 shadow-sm">
          {WEBDESIGN_STUDIO_HIGHLIGHTS.map((item) => (
            <li key={item} className="flex gap-3 text-gray-700">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {WEBDESIGN_REFERENCE_PROJECTS.length > 0 && (
          <section className="mb-10 rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-primary-50 p-6 shadow-sm" aria-labelledby="ref-heading">
            <h2 id="ref-heading" className="text-lg font-semibold text-gray-800">
              Weitere umgesetzte Auftritte
            </h2>
            <ul className="mt-4 space-y-3">
              {WEBDESIGN_REFERENCE_PROJECTS.map((project) => (
                <li key={project.url}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-primary-600 underline-offset-4 transition hover:text-primary-800 hover:underline"
                  >
                    {project.label}
                    <span className="text-xs font-normal text-gray-500">
                      ({project.url.replace(/^https?:\/\//, '')})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-sm leading-relaxed text-gray-600">
          Inhalte, Marke und Angebote von {SITE_NAME} liegen beim Unternehmen. Diese Seite dient ausschließlich der
          Information, von wem dieser Webauftritt konzipiert und umgesetzt wurde.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          {hasWebsite && (
            <a
              href={WEBDESIGN_STUDIO_WEBSITE.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-500 px-8 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-primary-600 hover:shadow-lg"
            >
              Portfolio &amp; Angebot
            </a>
          )}
          {hasEmail && (
            <a
              href={`mailto:${WEBDESIGN_STUDIO_EMAIL.trim()}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-primary-500 px-8 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-primary-600 hover:shadow-lg"
            >
              E-Mail an {WEBDESIGN_STUDIO_EMAIL_BUTTON_NAME}
            </a>
          )}
          {hasPhone && (
            <a
              href={`tel:${WEBDESIGN_STUDIO_PHONE_E164.trim()}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-primary-600 bg-white px-8 py-3 text-center text-sm font-semibold text-primary-700 transition hover:bg-primary-600 hover:text-white"
            >
              Anrufen · {WEBDESIGN_STUDIO_PHONE_DISPLAY}
            </a>
          )}
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-primary-600 bg-white px-8 py-3 text-center text-sm font-semibold text-primary-700 transition hover:bg-primary-600 hover:text-white"
          >
            Kontakt zum Betrieb
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
          >
            Zurück zu {SITE_NAME}
          </Link>
        </div>
      </div>
    </div>
  )
}
