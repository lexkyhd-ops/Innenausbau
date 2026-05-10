import { FiMail, FiPhone } from 'react-icons/fi'

const PHONE_E164 = '+436641325995'
const PHONE_DISPLAY = '+43 664 1325995'
const EMAIL = 'kontakt@berishakg.at'

export default function TopContactBar() {
  return (
    <div
      className="bg-slate-950 text-white/95 border-b border-slate-800"
      role="region"
      aria-label="Kontakt Kurzinfo"
    >
      <div className="container mx-auto px-4 py-2 sm:py-2.5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-1.5 text-xs sm:text-sm font-medium">
          <a
            href={`tel:${PHONE_E164}`}
            className="inline-flex items-center gap-2 text-white hover:text-sky-200 transition-colors"
          >
            <FiPhone className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 text-white hover:text-sky-200 transition-colors break-all sm:break-normal"
          >
            <FiMail className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
            <span>{EMAIL}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
