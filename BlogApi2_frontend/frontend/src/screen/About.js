import React from "react";

function AboutPage() {
  return (
    // <div className="max-w-md mx-auto  p-8 rounded-lg shadow-sm">
    // <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6 py-10">
    //     <h1 className="text-4xl font-extrabold mb-6 text-[var(--color-forest)] text-center">
    //       ✨ Welcome to Your Blogging Journey!
    //     </h1>
        
    //     <p className="text-lg text-gray-700 leading-relaxed mb-4">
    //       Have a story to tell? A lesson to share? <span className="font-semibold"> This platform is your space </span> 
    //       to write, reflect, and express. Whether it's life experiences, knowledge, or just a personal journal—every blog
    //       you write is a step toward inspiring someone.
    //     </p>

    //     <p className="text-lg text-gray-700 leading-relaxed mb-4">
    //       Writing is more than just words—it's about creating impact. <span className="font-semibold"> Use this space  </span> 
    //       to document your thoughts, educate, and connect with like-minded individuals.
    //     </p>

    //     <p className="text-lg text-gray-700 leading-relaxed">
    //       Ready to start your blogging adventure? Click below and begin your journey! 🚀
    //     </p>

    //     <div className="mt-6 flex justify-center">
    //       <a
    //         href="/addblog"
    //         className="px-6 py-3 bg-[var(--color-forest)] text-white text-lg rounded-lg shadow-md 
    //         hover:bg-green-700 transition-all"
    //       >
    //         ✍️ Start Writing Now
    //       </a>
    //     </div>
    //   </div>
    // </div>
    
    <div className="max-w-md mx-auto  p-8 rounded-lg shadow-sm">
    
    
      <h1 className="text-3xl font-extrabold text-[var(--color-forest)] mb-2">
        About This Blog
      </h1>
  
      <p className="text-sm text-gray-700 leading-relaxed mb-2">
        This platform is for writers, thinkers, and creators to share 
        their insights with the world. Whether you're a beginner or 
        an experienced blogger, this space is for **you**.
      </p>
  
      <p className="text-sm text-gray-700 leading-relaxed mb-2">
        ✨ Discover inspiring blogs, create meaningful content, and 
        connect with a community of like-minded individuals.
      </p>
  
      <p className="text-sm text-gray-700 leading-relaxed">
        Start your journey today and let your words make an impact! 🚀
      </p>
  
      <div className="mt-3 flex flex-col gap-2">
        <a
          href="/addblog"
          className="px-4 py-2 bg-[var(--color-forest)] text-white text-sm rounded-md shadow-md hover:bg-green-700 transition-all"
        >
          ✍️ Start Blogging
        </a>
  
        <a
          href="/"
          className="px-4 py-2 bg-gray-300 text-gray-800 text-sm rounded-md shadow-md hover:bg-gray-400 transition-all"
        >
          🔙 Back to Home
        </a>
      </div>
    
  </div>
    
   
  
  
  );
}

export default AboutPage;
