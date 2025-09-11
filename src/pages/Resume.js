export default function Resume() {
  const resumePath = "/Aryan Motghare - Full Stack Web Developer Resume (1).pdf";

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          Resume
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Download or view my resume below
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <a
            href={resumePath}
            download
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            Download PDF
          </a>
          <a
            href={resumePath}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            Open in new tab
          </a>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
        <object
          data={resumePath}
          type="application/pdf"
          className="w-full"
          style={{ height: "80vh" }}
        >
          <div className="p-6 text-center text-gray-600 dark:text-gray-400">
            <p className="mb-4">
              PDF preview is not supported in this browser.
            </p>
            <a
              href={resumePath}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              View Resume
            </a>
          </div>
        </object>
      </div>
    </section>
  );
}
