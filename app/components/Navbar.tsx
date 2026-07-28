export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/60 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">NexusQ</h1>

      <ul className="flex gap-8">
        <li><a href="#home">Home</a></li>
        <li><a href="#platforms">Platforms</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <button className="bg-white text-black px-4 py-2 rounded-lg font-medium">
        Partner With Us
      </button>
      </div>
    </nav>
  );
}