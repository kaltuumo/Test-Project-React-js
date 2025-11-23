import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">{children}</div>
    </div>
  );
};

export default MainLayout;
