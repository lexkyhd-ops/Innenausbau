'use client'

interface Company {
  name: string
  logo: string
}

interface TrustedCompaniesProps {
  companies: Company[]
}

export default function TrustedCompanies({ companies }: TrustedCompaniesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
            Uns vertrauen bereits
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
            Zahlreiche zufriedene Kunden und Unternehmen vertrauen auf unsere Qualität und Zuverlässigkeit
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 items-center mb-12">
          {companies.map((company, i) => (
            <div
              key={i}
              className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 rounded-2xl shadow-no-offset overflow-hidden border border-primary-100 pulse-blue flex flex-col items-center justify-center p-4 sm:p-6 hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ 
                animationDelay: `${i * 100}ms`
              }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-primary-200/20 rounded-full -mr-10 sm:-mr-12 -mt-10 sm:-mt-12 blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 sm:w-24 sm:h-24 bg-primary-300/20 rounded-full -ml-10 sm:-ml-12 -mb-10 sm:-mb-12 blur-xl"></div>
              
              <div className="relative z-10 w-full flex flex-col items-center">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-2 sm:mb-3 transition-all duration-300 hover:scale-110 rounded-lg bg-white p-1.5 sm:p-2 mx-auto" 
                  style={{
                    boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.06), 0 1px 2px 0px rgba(0, 0, 0, 0.04)'
                  }}
                  onMouseEnter={(e) => {
                    if (typeof window !== 'undefined' && window.innerWidth >= 640) {
                      e.currentTarget.style.boxShadow = '0 4px 12px 3px rgba(0, 0, 0, 0.12), 0 2px 6px 2px rgba(0, 0, 0, 0.08)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 4px 1px rgba(0, 0, 0, 0.06), 0 1px 2px 0px rgba(0, 0, 0, 0.04)'
                  }}
                />
                <p className="text-xs sm:text-sm text-gray-700 font-semibold text-center w-full">{company.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

