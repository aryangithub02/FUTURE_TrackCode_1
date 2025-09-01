import { SkillsInfo } from './constants';

export default function About() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">About</h1>
      <div className="space-y-3 text-gray-600 dark:text-gray-300 max-w-2xl">
        <p>
          I’m Aryan Motghare, a full-stack developer from Nagpur, India. I enjoy building applications that are not only functional but also deliver great user experiences.
        </p>
        <p>
          My journey started with curiosity for how things work on the web, and over time, I’ve developed strong skills in both frontend and backend technologies. Currently, I’m exploring scalable architectures and AI-driven solutions.
        </p>
        <p>
          When I’m not coding, you’ll find me reading about emerging tech, sharing dev insights, or working on side projects.
        </p>
      </div>

      <div className="space-y-4">
        {SkillsInfo.map((group) => (
          <div key={group.title}>
            <h2 className="text-xl font-semibold mb-2">{group.title}</h2>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <span key={s.name} className="chip">
                  <img src={s.logo} alt={s.name} className="h-4 w-4" />
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


