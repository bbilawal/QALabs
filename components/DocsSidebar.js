export default function DocsSidebar() {
  return (
    <div className="w-64 border-r border-white/10 p-6 hidden md:block">

      <h2 className="text-pink-500 font-bold mb-6">Docs</h2>

      <ul className="space-y-3 text-gray-300">
        <li className="hover:text-white cursor-pointer">Getting Started</li>
        <li className="hover:text-white cursor-pointer">CLI Setup</li>
        <li className="hover:text-white cursor-pointer">CI/CD Integration</li>
        <li className="hover:text-white cursor-pointer">Reports</li>
      </ul>

    </div>
  );
}