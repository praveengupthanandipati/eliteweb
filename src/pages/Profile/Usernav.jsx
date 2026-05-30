import { NavLink, useNavigate } from 'react-router-dom';

const ProfileIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AddressIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const OrdersIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_ITEMS = [
  { label: 'Profile Management', icon: <ProfileIcon />, path: '/profile' },
  { label: 'Address Management', icon: <AddressIcon />, path: '/addresses' },
  { label: 'My Orders',          icon: <OrdersIcon />,  path: '/orders' },
];

const Usernav = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth state / localStorage here before navigating
    navigate('/');
  };

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase() || '?'
    : '?';

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="pf-nav d-none d-lg-block">
        {/* User identity block */}
        <div className="pf-nav-user">
          <div className="pf-nav-avatar">{initials}</div>
          <div style={{ minWidth: 0 }}>
            <p className="pf-nav-name">
              {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
            </p>
            <p className="pf-nav-phone">
              {user?.phone ? `+91 ${user.phone}` : '—'}
            </p>
          </div>
        </div>

        {/* Nav items */}
        <ul className="pf-nav-list">
          {NAV_ITEMS.map(item => (
            <li key={item.path} className="pf-nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `pf-nav-link${isActive ? ' pf-nav-link--active' : ''}`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
          <li><hr className="pf-nav-divider" /></li>
          <li className="pf-nav-item">
            <button
              className="pf-nav-link pf-nav-link--danger"
              onClick={handleLogout}
            >
              <LogoutIcon />
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* ── Mobile horizontal nav ── */}
      <div className="pf-nav-mobile d-lg-none">
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `pf-nav-mobile-btn${isActive ? ' active' : ''}`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
        <button
          className="pf-nav-mobile-btn pf-nav-mobile-btn--danger"
          onClick={handleLogout}
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </>
  );
};

export default Usernav;
