import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { newsArticles } from "../lib/newsArticles";

const categories = ["All news", "Projects", "Insights", "Awards", "Studio"];

export default function NewsArchivePage() {
  const [activeCategory, setActiveCategory] = useState("All news");
  const filteredArticles =
    activeCategory === "All news"
      ? newsArticles
      : newsArticles.filter((article) => article.category === activeCategory);
  const [featuredArticle, ...remainingArticles] = filteredArticles;

  return (
    <main className="bg-[#f5f3ed] text-[#18392f]">
      <header className="border-b border-[#18392f]/15 bg-white px-5 pb-10 pt-36 sm:px-7 sm:pb-14 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <Link
            to="/media"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#56645b] transition-colors hover:text-[#bc2525]"
          >
            <ArrowLeft size={16} />
            Media
          </Link>
          <p className="mb-3 text-xs font-medium tracking-[0.18em] text-[#bc2525] uppercase">
            From the studio
          </p>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h1 className="m-0 max-w-3xl font-manrope text-4xl leading-tight font-medium tracking-tight sm:text-5xl lg:text-6xl">
              News &amp; perspectives
            </h1>
            <p className="mb-1 max-w-md text-sm leading-6 text-[#56645b]">
              Project announcements, studio updates, and ideas shaping the
              places around us.
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 py-10 sm:px-7 sm:py-14 lg:px-10 lg:py-16">
        <div className="mx-auto w-full max-w-7xl">
          <div
            aria-label="Filter news by category"
            className="mb-10 flex flex-wrap gap-x-7 gap-y-3 border-b border-[#18392f]/15"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`border-b-2 pb-3 text-sm transition-colors ${
                    isActive
                      ? "border-[#bc2525] font-medium text-[#18392f]"
                      : "border-transparent text-[#777d73] hover:text-[#18392f]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {featuredArticle ? (
            <>
              <article className="grid grid-cols-1 items-center gap-7 border-b border-[#18392f]/15 pb-10 md:grid-cols-2 md:gap-10 md:pb-14">
                <div className="aspect-16/10 overflow-hidden bg-[#dddcd4]">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="py-2">
                  <p className="mb-4 text-xs font-medium tracking-[0.14em] text-[#bc2525] uppercase">
                    {featuredArticle.category} · {featuredArticle.date}
                  </p>
                  <h2 className="m-0 max-w-xl font-manrope text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                    {featuredArticle.title}
                  </h2>
                  <p className="mb-0 mt-5 max-w-xl text-base leading-7 text-[#56645b]">
                    {featuredArticle.excerpt}
                  </p>
                  <span className="mt-7 inline-block text-xs font-medium tracking-[0.12em] text-[#777d73] uppercase">
                    Featured story
                  </span>
                </div>
              </article>

              {remainingArticles.length > 0 && (
                <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {remainingArticles.map((article) => (
                    <article key={article.id} className="group min-w-0">
                      <div className="mb-4 aspect-4/3 overflow-hidden bg-[#dddcd4]">
                        <img
                          src={article.image}
                          alt={article.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mb-2 text-[10px] font-medium tracking-[0.12em] text-[#777d73] uppercase">
                        {article.category} · {article.date}
                      </p>
                      <h2 className="m-0 font-manrope text-xl leading-snug font-medium transition-colors group-hover:text-[#bc2525]">
                        {article.title}
                      </h2>
                      <p className="mb-0 mt-3 text-sm leading-6 text-[#56645b]">
                        {article.excerpt}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="py-12 text-center text-sm text-[#56645b]">
              No stories found in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}