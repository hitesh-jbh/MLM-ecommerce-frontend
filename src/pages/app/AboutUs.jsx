import Breadcrumb from '../../components/ui/BreadCrumb.jsx';
import { websiteName } from '../../utils/Constants.jsx';


const AboutUs = () => {
  return (
    <main className="overflow-hidden bg-white">
      <div className="py-2 md:py-4">
        <Breadcrumb
          title="About Us" 
          showTitle={true}
          align="center"
          items={[
              { label: "Home", href: "/" },
              { label: "About Us" },
          ]}
        />
      </div>

      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-8 mb-8 md:mb-12">
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src="https://gentlehaus.in/cdn/shop/files/about_us_banner_175d66c4-5083-4403-8aa5-28c81ae439d8.webp?v=1754661865&width=1500" 
            alt="MLM Banner" 
            className="w-full h-[200px] sm:h-[300px] md:h-[700px] object-cover"
          />
        </div>
      </section>

      <section className="w-full max-w-6xl mx-auto px-5 text-center mb-12 md:mb-20">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-black leading-snug">
          It pains me to see men reduced to trends that strip away individuality and strength.
        </h2>
        
        <div className="text-left space-y-4 md:space-y-6 text-gray-700">
          <p className='text-sm sm:text-lg md:text-xl font-semibold text-black leading-relaxed'>
            True style doesn't rely on fitting in — it comes from the confidence to stand apart. 
          </p>
          
          <div className="space-y-4 text-xs sm:text-sm md:text-base leading-relaxed text-gray-600">
            <p>
              {`At ${websiteName}, we believe true style lies in the balance of elegance and simplicity. 
              Luxury doesn't always need to shout — it can be subtle and refined.`}
            </p>
            <p>
              We design for the modern man who lives with purpose. Creating fashion that resonates 
              with individuality is a craft that demands patience and integrity.
            </p>
            <p>
              Our focus is on authenticity — making clothes that uplift character. 
              Whether in a boardroom or an evening out, our pieces are crafted to make you feel 
              composed and sophisticated.
            </p>
            <p className="font-semibold text-black pt-2">
              Our philosophy is clear: make simplicity luxurious and make every man feel 
              like the best version of himself.
            </p>
          </div>
        </div>
      </section>

      <section className='w-full max-w-[1200px] mx-auto px-4 md:px-8 mb-12 md:mb-20'>
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          
          <div className="w-full lg:w-1/2">
            <img 
              src="https://gentlehaus.in/cdn/shop/files/about_us_side_banner.webp?v=1751090746&width=940" 
              alt="Brand Detail" 
              className="w-full h-[300px] md:h-[500px] rounded-lg object-cover"
            />
          </div>
          
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl md:text-4xl font-bold text-black mb-8">
              We are proudly Indian.
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "Soft Fabric",
                  desc: "Premium materials for a luxuriously smooth feel.",
                  icon: <ellipse cx="24" cy="20" rx="14" ry="8"/>,
                  path: <path d="M10 20 Q10 32 24 32 Q38 32 38 20"/>
                },
                {
                  title: "Lightweight",
                  desc: "Designed to feel barely there for effortless wear.",
                  icon: <path d="M24 8 L28 18 L38 20 L30 28 L32 38 L24 32 L16 38 L18 28 L10 20 L20 18 Z" />,
                  lines: true
                },
                {
                  title: "All Day Comfort",
                  desc: "Engineered for lasting comfort throughout the day.",
                  icon: <circle cx="24" cy="24" r="16"/>,
                  clock: true
                }
              ].map((feature, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-full flex items-center justify-center text-black">
                    <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                      {feature.icon}
                      {feature.path}
                      {feature.lines && (
                        <><line x1="24" y1="12" x2="24" y2="4"/><line x1="32" y1="14" x2="36" y2="8"/><line x1="16" y1="14" x2="12" y2="8"/></>
                      )}
                      {feature.clock && (
                        <><line x1="24" y1="24" x2="24" y2="12"/><line x1="24" y1="24" x2="32" y2="24"/></>
                      )}
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm md:text-lg font-bold text-black mb-1">{feature.title}</h4>
                    <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;