import { PageHead } from '@/components/ui';

export const metadata = { title: 'Privacy & consent' };

const CONSENTS = [
  ['Learning records (practice, tests, mastery)', 'Required for the school programme', true, true],
  ['Teacher-answered doubts', 'Required', true, true],
  ['Live-session recordings that include Aanya', 'Optional', false, false],
  ['AI study helper (when your school turns it on)', 'Optional, off by default', false, false],
] as const;

export default function Privacy() {
  return (
    <>
      <PageHead title="Privacy & consent" sub="Your school controls Aanya's data. We process it for the school, under India's Digital Personal Data Protection Act, 2023." />
      <div className="grid g2" style={{ alignItems: 'start' }}>
        <div className="card">
          <h2>Consents</h2>
          <div className="table-wrap"><table className="t">
            <thead><tr><th>Purpose</th><th>Type</th><th>Status</th></tr></thead>
            <tbody>{CONSENTS.map(([p, t, on, locked]) => (
              <tr key={p}><td>{p}</td><td className="small muted">{t}</td><td><label className="row small"><input type="checkbox" defaultChecked={on} disabled={locked} /> {on ? 'On' : 'Off'}</label></td></tr>
            ))}</tbody>
          </table></div>
        </div>
        <div className="card stack">
          <h2>Your rights</h2>
          <button className="btn ghost">Download Aanya's data</button>
          <button className="btn ghost">Ask for a correction</button>
          <button className="btn ghost">Request erasure (after leaving school)</button>
          <button className="btn ghost">Raise a grievance</button>
          <p className="small muted">We never show ads, never sell data, and never profile children for marketing. We do not collect Aadhaar or APAAR IDs.</p>
          <p className="notice small">Preview: the notice and consent wording is a draft, pending lawyer review before 13 May 2027 (DPDP Rules, Rule 10).</p>
        </div>
      </div>
    </>
  );
}
