import { useEffect, useState } from "react";
import PrivateNavbar from "../components/PrivateNavbar";
import { fetchAudit } from "../services/api";

const Audit = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    load()
  }, []);

    const load = async () => {
        const queried_logs = await fetchAudit();
        setLogs(queried_logs)
    };

  return (
    <>
      <PrivateNavbar />
      <div className="container mt-3">
        <h3>Audit Logs</h3>

        <ul className="list-group">
          {logs.map((l: any) => (
            <li key={l._id} className="list-group-item">
              {l.table} - {l.op}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Audit;