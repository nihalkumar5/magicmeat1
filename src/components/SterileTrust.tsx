'use client';

import React, { useState, useEffect } from 'react';

type AuditTab = 'coldchain' | 'sterility' | 'trimming';

export default function SterileTrust() {
  const [activeTab, setActiveTab] = useState<AuditTab>('coldchain');
  const [liveTemp, setLiveTemp] = useState<number>(2.1);
  const [tempHistory, setTempHistory] = useState<number[]>([2.2, 2.0, 2.3, 2.1, 1.9, 2.1, 2.2]);

  // Simulate real-time temperature fluctuations within standard safety limits
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTemp((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        const newTemp = Math.max(1.5, Math.min(2.8, prev + delta));
        
        // Update history
        setTempHistory((history) => {
          const nextHistory = [...history.slice(1), parseFloat(newTemp.toFixed(1))];
          return nextHistory;
        });

        return parseFloat(newTemp.toFixed(1));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sterile-trust-section container">
      <div className="trust-dashboard">
        
        {/* Left Side: Interactive Panels */}
        <div className="trust-content">
          <div className="concierge-badge">🔬 Pure Purity Protocol</div>
          <h2 className="concierge-title" style={{ marginTop: '0.5rem' }}>
            Michelin Sourcing & Clinical Sterility
          </h2>
          <p className="concierge-subtitle" style={{ margin: '0 0 2.5rem 0', textAlign: 'left' }}>
            We apply scientific precision to gourmet butchery. Monitor our real-time logistics logs, lab-testing protocols, and master trimmings standards below.
          </p>

          {/* Sourcing Tabs Navigation */}
          <div className="trust-tabs">
            <button 
              className={`trust-tab-btn ${activeTab === 'coldchain' ? 'active' : ''}`}
              onClick={() => setActiveTab('coldchain')}
            >
              ❄️ Live Cold-Chain Log
            </button>
            <button 
              className={`trust-tab-btn ${activeTab === 'sterility' ? 'active' : ''}`}
              onClick={() => setActiveTab('sterility')}
            >
              🧪 Microbiological Purity
            </button>
            <button 
              className={`trust-tab-btn ${activeTab === 'trimming' ? 'active' : ''}`}
              onClick={() => setActiveTab('trimming')}
            >
              🔪 Master Butchery Trim
            </button>
          </div>

          {/* TAB 1: COLD CHAIN LOG */}
          {activeTab === 'coldchain' && (
            <div className="trust-panel-body animate-fade">
              <div className="coldchain-live-banner">
                <div className="live-dot-glow"></div>
                <span>LIVE TEMPERATURE SENSOR FEED - INSULATED BOX TRANSIT MODULE</span>
              </div>

              <div className="temp-display-grid">
                <div className="temp-large-card">
                  <div className="temp-lbl">Active Storage Unit</div>
                  <div className="temp-val">{liveTemp}°C</div>
                  <div className="temp-status">⚡ OPTIMAL SAFE STATE</div>
                </div>

                <div className="temp-chart-container">
                  <div className="temp-lbl" style={{ marginBottom: '1rem' }}>Last 20 Mins Frequency Log</div>
                  <div className="temp-bar-chart">
                    {tempHistory.map((t, idx) => {
                      // Normalize bar heights (range 1.5 to 2.8 for safe bounds)
                      const pct = Math.max(30, Math.min(95, ((t - 1) / 2) * 100));
                      return (
                        <div className="chart-bar-wrapper" key={idx}>
                          <div 
                            className="chart-bar-fill" 
                            style={{ height: `${pct}%` }}
                          >
                            <span className="chart-bar-tooltip">{t}°C</span>
                          </div>
                          <span className="chart-bar-label">{3 * (6 - idx)}m ago</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <p className="panel-explanation">
                *Constant temperature maintained strictly under 3.2°C from farm aging vaults to cold dry-ice vans. Zero temperature excursions guaranteed.
              </p>
            </div>
          )}

          {/* TAB 2: MICROBIOLOGICAL PURITY */}
          {activeTab === 'sterility' && (
            <div className="trust-panel-body animate-fade">
              <div className="purity-grid">
                <div className="purity-card">
                  <div className="purity-icon">🧬</div>
                  <h4 className="purity-title">Clinically Zero Pathogens</h4>
                  <p className="purity-text">
                    Daily randomized microbiological swabs processed in accredited labs. Certified salmonella, listeria, and E-Coli free.
                  </p>
                </div>
                <div className="purity-card">
                  <div className="purity-icon">🛡️</div>
                  <h4 className="purity-title">Medical Vacuum Sealing</h4>
                  <p className="purity-text">
                    Packed inside multi-layered hospital-grade sterile films under inert nitrogen flow, locking freshness for 72 hours.
                  </p>
                </div>
                <div className="purity-card" style={{ borderRight: 'none' }}>
                  <div className="purity-icon">💊</div>
                  <h4 className="purity-title">No Hormone Accretions</h4>
                  <p className="purity-text">
                    100% natural, grass-fed feeds, free from antibiotic growth promoters or steroid injections. Clean proteins.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MASTER BUTCHERY TRIM */}
          {activeTab === 'trimming' && (
            <div className="trust-panel-body animate-fade">
              <div className="trimming-showcase">
                <div className="trimming-spec">
                  <div className="spec-bullet">01</div>
                  <div>
                    <h4 className="purity-title" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Silver-Skin Purge</h4>
                    <p className="purity-text" style={{ fontSize: '0.85rem' }}>
                      We carefully strip all tough connective membranes and sinew, leaving only melt-in-the-mouth muscle tissue.
                    </p>
                  </div>
                </div>
                <div className="trimming-spec">
                  <div className="spec-bullet">02</div>
                  <div>
                    <h4 className="purity-title" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>90/10 Mutton Standard</h4>
                    <p className="purity-text" style={{ fontSize: '0.85rem' }}>
                      Exact portion control. Our curry cuts are strictly regulated to contain less than 10% outer marbling fat.
                    </p>
                  </div>
                </div>
                <div className="trimming-spec" style={{ borderBottom: 'none' }}>
                  <div className="spec-bullet">03</div>
                  <div>
                    <h4 className="purity-title" style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>Clinically De-feathered</h4>
                    <p className="purity-text" style={{ fontSize: '0.85rem' }}>
                      Our poultry is flame-singed and individually double-scrubbed to guarantee zero pin-feathers or cutlet bruising.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Certified Badges Column */}
        <div className="trust-side-badge">
          <div className="certificate-card">
            <div className="certificate-logo">M</div>
            <h3 className="certificate-title">GUARANTEED SAFE</h3>
            <p className="certificate-subtitle">MAGICMEAT sterile SOURCING CERTIFIED</p>
            <div className="certificate-divider"></div>
            
            <div className="certificate-checklist">
              <div className="checklist-item">
                <span className="check-gold">✔</span>
                <span>ISO 22000 Certified Processing</span>
              </div>
              <div className="checklist-item">
                <span className="check-gold">✔</span>
                <span>Double Sterile Sealed</span>
              </div>
              <div className="checklist-item">
                <span className="check-gold">✔</span>
                <span>100% Traceability Audited</span>
              </div>
            </div>

            <div className="certificate-stamp">
              LACTATE AUDITED
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
