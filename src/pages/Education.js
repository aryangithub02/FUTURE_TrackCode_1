import { education } from './constants';

export default function Education() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Education</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {education.map((edu) => (
          <article key={edu.id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-gray-900 shadow-sm flex gap-4">
            <img
              src={edu.img}
              alt={edu.school}
              className="h-12 w-12 rounded object-cover border border-gray-200 dark:border-gray-800"
            />
            <div className="min-w-0">
              <h3 className="text-lg font-medium truncate">{edu.school}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{edu.date} • {edu.degree}{edu.grade ? ` • ${edu.grade}` : ''}</p>
              {edu.desc && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{edu.desc}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


