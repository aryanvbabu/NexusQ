export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-xl font-bold">NexusQ Global</h3>

        <div className="flex gap-6 mt-4 md:mt-0 text-gray-400">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>

        <p className="text-gray-500 mt-4 md:mt-0">
          © 2026 NexusQ Global. All rights reserved.
        </p>
      </div>
    </footer>
  );
}