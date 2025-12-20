import React from "react";

const Breadcrumb = ({
  title,
  items = [],
  showTitle = true,
  align = "center",
  separator = "›",
  className = "",
}) => {
  return (
    <div className={`w-full px-4 sm:px-6 ${className} ${align === "center" ? "text-center" : "text-left"}`}>
      {showTitle && title && (
        <h1 className="text-xl md:text-3xl font-light tracking-tight mb-2 text-[#1a1a1a]">
          {title}
        </h1>
      )}
      
      <nav 
        className={`flex flex-wrap items-center gap-y-1 gap-x-1.5 text-[12px] md:text-xs uppercase tracking-widest ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <div key={index} className="flex items-center">
              {item.href && !isLast ? (
                <a 
                  href={item.href} 
                  className="text-black text-[18px] hover:text-black transition-colors whitespace-nowrap"
                >
                  {item.label}
                </a>
              ) : (
                <span className={`text-black text-[18px] font-medium ${isLast ? "line-clamp-1 max-w-[200px] md:max-w-none" : "whitespace-nowrap"}`}>
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="ml-1.5 text-black select-none">
                  {separator}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;