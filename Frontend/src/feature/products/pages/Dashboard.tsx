import React from "react";
import "./Dashboard.css";

// --- Types ---
interface StatData {
  id: number;
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
}

interface OrderData {
  id: string;
  item: string;
  size: string;
  date: string;
  price: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
}

// --- Dummy Data ---
const stats: StatData[] = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$12,450",
    trend: "+15%",
    isPositive: true,
  },
  {
    id: 2,
    title: "Active Listings",
    value: "142",
    trend: "+3",
    isPositive: true,
  },
  {
    id: 3,
    title: "Pending Orders",
    value: "28",
    trend: "-2%",
    isPositive: false,
  },
  {
    id: 4,
    title: "Store Views",
    value: "4,231",
    trend: "+8%",
    isPositive: true,
  },
];

const recentOrders: OrderData[] = [
  {
    id: "#ORD-092",
    item: "Vintage Denim Jacket",
    size: "M",
    date: "Oct 24, 2026",
    price: "$85.00",
    status: "Pending",
  },
  {
    id: "#ORD-091",
    item: "Linen Summer Shirt",
    size: "L",
    date: "Oct 23, 2026",
    price: "$45.00",
    status: "Processing",
  },
  {
    id: "#ORD-090",
    item: "Pleated Midi Skirt",
    size: "S",
    date: "Oct 23, 2026",
    price: "$55.00",
    status: "Shipped",
  },
  {
    id: "#ORD-089",
    item: "Oversized Graphic Tee",
    size: "XL",
    date: "Oct 22, 2026",
    price: "$25.00",
    status: "Delivered",
  },
  {
    id: "#ORD-088",
    item: "Classic Trench Coat",
    size: "M",
    date: "Oct 21, 2026",
    price: "$120.00",
    status: "Delivered",
  },
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>VogueSeller</h2>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            Dashboard
          </a>
          <a href="#" className="nav-item">
            Products
          </a>
          <a href="#" className="nav-item">
            Orders
          </a>
          <a href="#" className="nav-item">
            Customers
          </a>
          <a href="#" className="nav-item">
            Analytics
          </a>
          <a href="#" className="nav-item">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1>Seller Dashboard</h1>
            <p className="subtitle">
              Welcome back, here is what's happening with your store today.
            </p>
          </div>
          <div className="header-profile">
            <button className="btn-add-product">+ Add New Product</button>
            <div className="avatar">A</div>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-card">
              <h3 className="stat-title">{stat.title}</h3>
              <div className="stat-body">
                <span className="stat-value">{stat.value}</span>
                <span
                  className={`stat-trend ${stat.isPositive ? "trend-up" : "trend-down"}`}
                >
                  {stat.trend}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* Content Grid (Orders & Inventory) */}
        <section className="content-grid">
          {/* Recent Orders */}
          <div className="orders-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <button className="btn-link">View All</button>
            </div>
            <div className="table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="fw-500">{order.id}</td>
                      <td>{order.item}</td>
                      <td>{order.size}</td>
                      <td>{order.date}</td>
                      <td>{order.price}</td>
                      <td>
                        <span
                          className={`status-badge status-${order.status.toLowerCase()}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
