function Header({ userInfo }) {
  return (
    <div className="top-bar">
      <div className="welcome-section">
        <h1>
          Xin chào, {userInfo?.name?.split(' ').pop() || "Admin"}! 👋
        </h1>
        <p>Chào mừng bạn quay trở lại. Dưới đây là tổng quan hệ thống hôm nay.</p>
      </div>

      <div className="date-time">
        {new Date().toLocaleDateString('vi-VN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </div>
    </div>
  );
}

export default Header;