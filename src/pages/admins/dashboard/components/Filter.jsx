function RecentActivity() {
  return (
    <div className="recent-section">
      <div className="recent-header">
        <h2>Hoạt động gần đây</h2>
        <button className="view-all">Xem tất cả</button>
      </div>

      <div className="activity-list">
        {[1,2,3].map((i) => (
          <div key={i} className="activity-item">
            <div className="activity-dot"></div>
            <div className="activity-detail">
              <p><strong>Người dùng mới</strong> đã đăng ký tài khoản</p>
              <span>5 phút trước</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;