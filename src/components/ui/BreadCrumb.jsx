import React from "react";

const Breadcrumb = ({
  title,
  items = [], // [{ label, href }]
  showTitle = true,
  align = "center", // "center" | "left"
  separator = "›",
  className = "",
}) => {
  return (
    <div
      className={`
        w-full px-4
        ${showTitle ? "py-8 md:py-12 lg:py-20" : "py-4"}
        ${align === "center" ? "text-center" : "text-left"}
        ${className}
      `}
    >
      {/* PAGE TITLE (Optional) */}
      {showTitle && (
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] font-light tracking-tight mb-4">
          {title}
        </h1>
      )}

      {/* BREADCRUMB */}
      <nav
        className={`flex flex-wrap items-center gap-2 text-gray-500 text-2xl ${
          align === "center" ? "justify-center" : "justify-start"
        }`}
        aria-label="Breadcrumb"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-black transition-colors duration-200"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-black font-medium">
                  {item.label}
                </span>
              )}

              {!isLast && (
                <span className="mx-1 text-gray-400">{separator}</span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;


// import React from "react";

// const Breadcrumb = ({ 
//   currentPage, 
//   breadcrumbs = [],
//   title,
//   className = "",
//   showHomeLink = true,
//   homeLinkText,
//   homeLinkUrl = "/",
//   separator = " > "
// }) => {
//   // Build the path string
//   const pathParts = [];
  
//   if (showHomeLink) {
//     pathParts.push(homeLinkText);
//   }
  
//   breadcrumbs.forEach(crumb => {
//     pathParts.push(crumb.name);
//   });
  
//   pathParts.push(currentPage);
  
//   const pathString = pathParts.join(separator);
  
//   return (
//     <div className={`py-8 md:py-12 lg:py-20 text-center px-4 ${className}`}>
//       {/* Current Page as H1 */}
//       <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[70px] leading-tight md:leading-[1.333] font-light mb-4 md:mb-6 tracking-tight">
//         {title || currentPage}
//       </h1>
      
//       {/* Breadcrumb path as clickable links in paragraph */}
//       <p className="flex justify-center items-center flex-wrap gap-1 text-[34px] sm:text-sm md:text-[23px] text-gray-500">
//         {showHomeLink && (
//           <>
//             <a 
//               href={homeLinkUrl} 
//               className="hover:text-black transition-colors duration-200 hover:underline"
//             >
//               {homeLinkText}
//             </a>
//             <span className="mx-1">{separator}</span>
//           </>
//         )}
        
//         {breadcrumbs.map((crumb, index) => (
//           <React.Fragment key={index}>
//             {crumb.url ? (
//               <a 
//                 href={crumb.url} 
//                 className="hover:text-black transition-colors duration-200 hover:underline"
//               >
//                 {crumb.name}
//               </a>
//             ) : (
//               <span>{crumb.name}</span>
//             )}
//             <span className="mx-1">{separator}</span>
//           </React.Fragment>
//         ))}
        
//         {/* Current page (not clickable) */}
//         <span className="text-black font-medium">{currentPage}</span>
//       </p>
//     </div>
//   );
// };

// export default Breadcrumb;