export default function Resume() {
  const resumePath = '/Aryan Motghare - Full Stack Web Developer Resume (1).pdf';

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Resume</h1>
        <div className="flex gap-2">
          <a
            className="px-4 py-2 rounded-md bg-gray-900 text-white dark:bg-white dark:text-gray-900"
            href={resumePath}
            download
          >
            Download PDF
          </a>
          <a
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700"
            href={resumePath}
            target="_blank"
            rel="noreferrer"
          >
            Open in new tab
          </a>
        </div>
      </div>

      <div className="rounded-md border border-gray-200 dark:border-gray-800 overflow-hidden">
        <object data={resumePath} type="application/pdf" className="w-full" style={{ height: '80vh' }}>
          <p className="p-4 text-sm">
            PDF preview is not supported in this browser.{' '}
            <a className="text-blue-600 hover:underline" href={resumePath} target="_blank" rel="noreferrer">Click here</a> to view.
          </p>
        </object>
      </div>
    </section>
  );
}


