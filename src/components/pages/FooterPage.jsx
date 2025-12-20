import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { FooterPageData } from "../ui/FooterPageData.js";
import Breadcrumb from "../ui/BreadCrumb.jsx";

const FooterPage = () => {
  const { id } = useParams();
  const data = FooterPageData.find((item) => item.id === id);

  if (!data) return <Navigate to="/" />;

  const formatText = (text) => {
    return text.split('**').map((part, i) => 
      i % 2 === 1 ? <span key={i} className="font-semibold text-black">{part}</span> : part
    );
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-gray-200">
      {/* Centered Container */}
      <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-20">
        
        {/* Header Section: Matching image_0a00ac.png */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-3xl font-medium text-gray-900 mb-6 tracking-tight">
            {data.title}
          </h1>
          
          <div className="flex justify-center mb-10">
            <Breadcrumb 
              showTitle={false} 
              items={[
                { label: "Home", href: "/" },
                { label: data.title },
              ]}
            />
          </div>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-left md:text-justify mb-8">
            {data.intro}
          </p>
          
          {/* Subtle horizontal line from the image */}
          <div className="border-b border-gray-300 w-full mb-12"></div>
        </header>

        {/* Content Sections: Matching image_0a00e6.png */}
        <div className="space-y-16">
          {data.sections.map((section) => (
            <section key={section.id} className="animate-in fade-in duration-700">
              <h2 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">
                {section.heading}
              </h2>
              
              <div className="space-y-6">
                {section.items.map((item, idx) => {
                  if (item.type === "subheading") return (
                    <h3 key={idx} className="text-lg font-bold text-black mt-8 mb-2 underline underline-offset-4">{item.text}</h3>
                  );
                  
                  if (item.type === "paragraph") return (
                    <p key={idx} className="text-gray-700 leading-relaxed text-base md:text-lg text-left">
                      {formatText(item.text)}
                    </p>
                  );

                  if (item.type === "list") return (
                    <div key={idx} className="space-y-3">
                      {item.title && <p className="text-gray-900 font-medium mb-2">{item.title}</p>}
                      <ul className="space-y-3 ml-2">
                        {item.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-3 text-gray-700">
                            {/* Dot marker from image_0a010a.png */}
                            <span className="text-black text-xl leading-none">•</span>
                            <span className="text-base md:text-lg">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                  if (item.type === "note" || item.type === "warning") return (
                    <div key={idx} className={`my-8 p-6 ${item.type === 'warning' ? 'bg-red-50 border-l-4 border-red-400' : 'bg-gray-50 border-l-4 border-black'}`}>
                      <p className="text-gray-800 italic leading-relaxed">
                        {formatText(item.text)}
                      </p>
                    </div>
                  );

                  return null;
                })}
              </div>
              
              {/* Divider between major sections */}
              <div className="border-b border-gray-200 w-full mt-16"></div>
            </section>
          ))}
        </div>

        {/* Support Footer: Professional Layout */}
        <footer className="mt-24 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">Official Support</span>
              <a href={`mailto:${data.contact.email}`} className="text-lg md:text-xl font-light hover:text-gray-600 transition-colors">
                {data.contact.email}
              </a>
            </div>
            <div className="md:text-right">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-2">WhatsApp Assistance</span>
              <p className="text-lg md:text-xl font-light tracking-wide">
                {data.contact.whatsapp}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default FooterPage;