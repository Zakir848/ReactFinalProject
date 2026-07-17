import { Link, useParams } from "react-router-dom";
import { useContextFunc } from "../../context/JobContext";
import "../../styles/UserDetail.css";
import Footer from "../../components/Footer";

export default function UserDetail() {
  const { users } = useContextFunc();
  const { id } = useParams();

  const user = users.find((user) => user.id === id);

  const role = user.role === "Worker";

  if (!user) {
    return (
      <div>
        <p>Melumat tapilmadi</p>
        <Link to={"/"}>Go To Main Page</Link>
      </div>
    );
  }

  return (
    <div className="worker-page">
      <Link to="/" className="back-btn">
        ← Geriyə Dön
      </Link>

      <div className="worker-card">
        <div className={`card-avatar ${user.gender?.toLowerCase()} `}>
          {role ? user?.name?.charAt(0) : user.companyName?.charAt(0)}
        </div>

        <h2 className="card-name">
          {user.name} {user.surname}
        </h2>
        {role ? (
          <p className="card-badge">
            {user.gender} • {user.age} yaş
          </p>
        ) : (
          <p className="card-badge">Company • {user?.companyName}</p>
        )}

        <div className="card-info">
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value email-link">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">User ID:</span>
            <span className="info-value">#{user.id}</span>
          </div>
          <div className="info-item">
            {role ? (
              <>
                <span className="info-label"> Birthday:</span>
                <span className="info-value">{user.birthday}</span>
              </>
            ) : (
              <>
                <span className="info-label"> Founding day:</span>
                <span className="info-value">{user.foundingDate}</span>
              </>
            )}
          </div>
          <div className="info-item">
            <span className="info-label">System Status:</span>
            <span className="info-value status-active">Aktiv</span>
          </div>
        </div>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}
