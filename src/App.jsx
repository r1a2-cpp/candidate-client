import React, { useEffect, useState } from 'react';

const API_URL = 'https://candidateapp.up.railway.app/api/office-data';

export default function App() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Network error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!mounted) return;
        // normalize so SL exists and is number
        const list = (json || []).map((it, i) => ({
          SL: Number(it.SL ?? i + 1),
          fullName: it.fullName ?? '',
          passportNumber: it.passportNumber ?? '',
          agentName: it.agentName ?? '',
          status: it.status ?? it.overallStatus ?? '',
          receivedDate: it.receivedDate ?? '',
        }));
        setCandidates(list);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message);
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  const filtered = candidates.filter((c) => {
    const ql = q.trim().toLowerCase();
    if (!ql) return true;
    return (
      String(c.SL).includes(ql) ||
      c.fullName.toLowerCase().includes(ql) ||
      c.passportNumber.toLowerCase().includes(ql) ||
      c.agentName.toLowerCase().includes(ql)
    );
  });

  return (
    <div className="container">
      <header>
        <h1>Candidates</h1>
        <p className="muted">Simple table with data fetched from your API</p>
      </header>

      <div className="controls">
        <input
          type="search"
          placeholder="Search by name / passport / agent / SL"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="center">Loading …</div>
      ) : error ? (
        <div className="center error">Error: {error}</div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Passport No</th>
                <th>Agent</th>
                <th>Status</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty">No results</td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.SL + c.passportNumber}>
                    <td>{c.SL}</td>
                    <td>{c.fullName}</td>
                    <td className="mono">{c.passportNumber}</td>
                    <td>{c.agentName}</td>
                    <td>{c.status || '-'}</td>
                    <td>{c.receivedDate ? new Date(c.receivedDate).toLocaleDateString() : '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <footer className="foot muted">
        <small>Connected to: {API_URL}</small>
      </footer>
    </div>
  );
}
