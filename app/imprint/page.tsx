import { Navigation, Footer } from '@/components/layout'

export default function ImprintPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-1 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-12">Imprint (Impressum)</h1>
          
          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Company Information</h2>
              <div className="text-gray-600 space-y-2">
                <p className="font-semibold text-gray-900">vayada UG (haftungsbeschränkt)</p>
                <p>Speditionstr. 15A</p>
                <p>40221 Düsseldorf</p>
                <p>Germany</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Represented by</h2>
              <p className="text-gray-600">Managing Director: Timo Christian Schreyer</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Contact</h2>
              <p className="text-gray-600">
                E-Mail:{' '}
                <a 
                  href="mailto:t.schreyer@vayada.com" 
                  className="text-primary-600 hover:text-primary-700 underline"
                >
                  t.schreyer@vayada.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Registration</h2>
              <div className="text-gray-600 space-y-2">
                <p>Amtsgericht Düsseldorf, HRB 107614</p>
                <p>EUID: DER1101.HRB107614</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

