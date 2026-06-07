
function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <h1 className="text-2xl font-bold">
          Bulk Mail Sender
        </h1>

        <ul className="flex gap-6">
    
          <li>
            <a
              href="/login"
              className="hover:text-gray-200 transition"
            >
              Home
            </a>
          </li>

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;