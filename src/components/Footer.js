export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-600 dark:text-gray-300">
        © {new Date().getFullYear()} My Portfolio. All rights reserved.
      </div>
    </footer>
  );
}


