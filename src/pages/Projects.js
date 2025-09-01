import { projects } from './constants';

export default function Projects() {
  return (
    <section id="projects" className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-sm">
            {p.image && (
              <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-md border border-gray-200 dark:border-gray-800" />
            )}
            <h2 className="text-xl font-semibold mt-3">{p.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{p.description}</p>
            {Array.isArray(p.tags) && p.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-700">{tag}</span>
                ))}
              </div>
            )}
            {p.github && (
              <div className="mt-3">
                <a className="text-sm font-medium text-blue-600 hover:underline" href={p.github} target="_blank" rel="noreferrer">Source</a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}


