import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900 
                dark:bg-gray-950 dark:text-gray-100 
                transition-colors duration-300">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
};

export default Layout;