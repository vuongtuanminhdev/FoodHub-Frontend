// src/components/common/Layout.jsx
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="admin-layout">
      <Header />
      <Sidebar />
      <main className="admin-main">
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;