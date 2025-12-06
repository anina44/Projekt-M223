import Navigation from "./Navigation"
import { Outlet } from "react-router-dom"

// Layout component that includes the Navigation and Outlet for nested routes
export default function Layout() {
  return (
    <div>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
