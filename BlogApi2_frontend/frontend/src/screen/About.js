import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6 py-10">
      <div className="max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6 text-[var(--color-forest)] text-center">
          ✨ Welcome to Your Blogging Journey!
        </h1>
        
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Have a story to tell? A lesson to share? <span className="font-semibold"> This platform is your space </span> 
          to write, reflect, and express. Whether it's life experiences, knowledge, or just a personal journal—every blog
          you write is a step toward inspiring someone.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Writing is more than just words—it's about creating impact. <span className="font-semibold"> Use this space  </span> 
          to document your thoughts, educate, and connect with like-minded individuals.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Ready to start your blogging adventure? Click below and begin your journey! 🚀
        </p>

        <div className="mt-6 flex justify-center">
          <a
            href="/addblog"
            className="px-6 py-3 bg-[var(--color-forest)] text-white text-lg rounded-lg shadow-md 
            hover:bg-green-700 transition-all"
          >
            ✍️ Start Writing Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
