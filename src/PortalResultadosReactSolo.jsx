import React, { useMemo, useState } from "react";

/**
 * React puro, desde cero. Sin Tailwind, sin frameworks, sin plantillas literales en estilos.
 * Layout centrado, tabs claros, ancho uniforme en todas las vistas.
 */

// ==============================
// Configuración demo
// ==============================
const DEMO_STUDY_ID = "d7f1d140-a8915e21-18c599e6-2e9a9bed-dbc01840";
const OSIMIS_VIEWER_BASE = "http://168.243.238.18:8043/osimis-viewer/app/index.html";
const ORTHANC_API_BASE = "http://168.243.238.18:8042/orthanc";

const osimisUrlFor = (studyId) => OSIMIS_VIEWER_BASE + "?study=" + studyId;
const dicomZipUrlFor = (studyId) => ORTHANC_API_BASE + "/studies/" + studyId + "/archive";

//const DEMO_REPORT_PDF = "/reporteDemoBenjamin.pdf";
const DEMO_REPORT_PDF = new URL("./assets/reporteDemoBenjamin.pdf", import.meta.url).href;

const mockPatient = {
  id: "BENJAMIN-DEMO",
  name: "Paciente DEMO (Benjamin)",
  dob: "1990-01-01",
  age: 34,
  sex: "Masculino",
};

const benjaminStudy = {
  id: DEMO_STUDY_ID,
  modality: "CR",
  title: "Columna Lumbosacra",
  date: "2025-09-03",
  description: "Estudio CR Columna Lumbosacra (demo Benjamin).",
  radiologist: "Medico Radiologo",
  preview: osimisUrlFor(DEMO_STUDY_ID),
  dicomZip: dicomZipUrlFor(DEMO_STUDY_ID),
  reportPdf: DEMO_REPORT_PDF,
};

const mockStudies = [
  { ...benjaminStudy, id: DEMO_STUDY_ID + "-1" },
  { ...benjaminStudy, id: DEMO_STUDY_ID + "-2" },
  { ...benjaminStudy, id: DEMO_STUDY_ID + "-3" },
];

export default function PortalResultadosReactSolo() {
  const [activeTab, setActiveTab] = useState("historial");
  const [selectedStudyId, setSelectedStudyId] = useState(mockStudies[0].id);
  const selectedStudy = useMemo(
    () => mockStudies.find((s) => s.id === selectedStudyId) || mockStudies[0],
    [selectedStudyId]
  );

  return (
    <div className="pr-root">
      {/* Estilos SCOPED al componente */}
      <style>{`
        .pr-root {
  --bg:#FFFFFF;
  --text:#1F2937;
  --border:#E5E7EB;
  --brand:#0A66FF;
  color-scheme: light;
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
}
        .pr-root, .pr-root *{ box-sizing: border-box; }
        .pr-page{ background: var(--bg); color: var(--text); min-height: 100vh; }
        .pr-container{ max-width: 1100px; margin: 0 auto; padding: 2rem 1rem; }
        .pr-card{ background:#FFFFFF; border:1px solid var(--border); border-radius: 1rem; }
        .pr-header{ text-align:center; padding:2rem; }
        .pr-title{ margin:0; font-weight:800; font-size:2.25rem; color: var(--brand); }
        .pr-sub{ margin:.5rem 0 0; font-size:.95rem; }

        .pr-tabs{ display:flex; gap:.5rem; padding:.75rem 1rem; border-bottom:1px solid var(--border); }
        .pr-tab{ border:none; background:#FFFFFF; color:var(--text); padding:.5rem 1rem; border-radius:.5rem .5rem 0 0; cursor:pointer; font-weight:600; }
        .pr-tab[aria-selected="true"]{ border-bottom: 2px solid var(--brand); }

        .pr-main{ padding: 1rem; }
        .pr-center{ display:flex; justify-content:center; width:100%; }
        .pr-grid{ width:100%; max-width: 1000px; display:grid; grid-template-columns: 320px 1fr; gap: 1rem; }

        .pr-list{ display:grid; gap:.75rem; }
        .pr-item{ background:#FFFFFF; border:1px solid var(--border); border-radius:.75rem; text-align:left; padding:1rem; cursor:pointer; }
        .pr-item.active{ border-color: var(--brand); }
        .pr-item .pr-badge{ font-size:.7rem; text-transform:uppercase; letter-spacing:.04em; }
        .pr-item .pr-title2{ font-weight:600; }
        .pr-item .pr-date{ font-size:.7rem; }

        .pr-panel{ background:#FFFFFF; border:1px solid var(--border); border-radius:.75rem; padding:1rem; }
        .pr-row{ display:flex; align-items:center; justify-content:space-between; gap:.75rem; flex-wrap:wrap; }
        .pr-actions{ display:flex; gap:.5rem; }

        .pr-btn{ appearance:none; background:#F8F9FA; color:var(--text); border:1px solid var(--border); border-radius:.5rem; padding:.5rem 1rem; font-weight:600; cursor:pointer; }
        .pr-btn:focus{ outline:2px solid var(--brand); outline-offset:2px; }
        .pr-btn--primary{ background: var(--brand); color:#FFFFFF; border-color: var(--brand); }

        .pr-embed{ background:#FFFFFF; border:1px solid var(--border); border-radius:.75rem; overflow:hidden; }
        .pr-embed--img{ height:72vh; }
        .pr-embed--pdf{ height:80vh; }

        .pr-foot{ text-align:center; font-size:.75rem; padding-top:.75rem; }
      `}</style>

      <div className="pr-page">
        <div className="pr-container">
          <div className="pr-card pr-header">
            <h1 className="pr-title">Demo Portal de Pacientes</h1>
            <p className="pr-sub">Resultados de estudios • Visor Osimis/Orthanc</p>
          </div>

          <div className="pr-card" style={{ marginTop: '1rem' }}>
            <div className="pr-tabs">
              <button className="pr-tab" aria-selected={activeTab === 'historial'} onClick={() => setActiveTab('historial')}>Historial</button>
              <button className="pr-tab" aria-selected={activeTab === 'imagenes'} onClick={() => setActiveTab('imagenes')}>Imágenes</button>
              <button className="pr-tab" aria-selected={activeTab === 'reporte'} onClick={() => setActiveTab('reporte')}>Reporte</button>
            </div>

            <div className="pr-main">
              {/* HISTORIAL */}
              {activeTab === 'historial' && (
                <div className="pr-center">
                  <div className="pr-grid">
                    <div className="pr-list">
                      {mockStudies.map((s) => (
                        <div key={s.id} className={'pr-item' + (selectedStudyId === s.id ? ' active' : '')} onClick={() => { setSelectedStudyId(s.id); }}>
                          <div className="pr-row">
                            <div>
                              <div className="pr-badge">{s.modality}</div>
                              <div className="pr-title2">{s.title}</div>
                            </div>
                            <div className="pr-date">{new Date(s.date).toLocaleDateString()}</div>
                          </div>
                          <div style={{ marginTop: '.25rem', fontSize: '.9rem' }}>{s.description}</div>
                          <div style={{ marginTop: '.5rem', fontSize: '.75rem' }}>Radiólogo: {s.radiologist}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pr-panel">
                      <div className="pr-row">
                        <div>
                          <div style={{ fontSize: '.9rem' }}>Estudio seleccionado</div>
                          <div className="pr-title2" style={{ fontSize: '1.25rem' }}>{selectedStudy.title}</div>
                        </div>
                        <div className="pr-actions">
                          <a className="pr-btn pr-btn--primary" href={selectedStudy.preview} target="_blank" rel="noreferrer">Abrir visor (Osimis)</a>
                          <a className="pr-btn pr-btn--primary" href={selectedStudy.dicomZip} target="_blank" rel="noreferrer">Descargar DICOM</a>
                          <button className="pr-btn" onClick={() => setActiveTab('imagenes')}>Ver imágenes</button>
                          <button className="pr-btn" onClick={() => setActiveTab('reporte')}>Ver reporte</button>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', fontSize: '.95rem' }}>
                        <div><strong>Paciente:</strong> {mockPatient.name}</div>
                        <div><strong>Fecha:</strong> {new Date(selectedStudy.date).toLocaleString()}</div>
                        <div><strong>Modalidad:</strong> {selectedStudy.modality}</div>
                        <div><strong>Estudio:</strong> {selectedStudy.title}</div>
                        <div><strong>Radiólogo:</strong> {selectedStudy.radiologist}</div>
                        <div><strong>Descripción:</strong> {selectedStudy.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* IMÁGENES */}
{activeTab === 'imagenes' && (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '100%', maxWidth: 1000 }}>
      {/* Caja del visor sin padding interno */}
      <div style={{
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#FFFFFF'
      }}>
        {/* Barra superior */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '12px 16px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Visor embebido</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={selectedStudy.preview} target="_blank" rel="noreferrer"
               style={{ padding: '8px 12px', borderRadius: 8, background: '#0A66FF', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
              Abrir en pestaña nueva
            </a>
            <a href={selectedStudy.dicomZip} target="_blank" rel="noreferrer"
               style={{ padding: '8px 12px', borderRadius: 8, background: '#0A66FF', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
              Descargar DICOM
            </a>
          </div>
        </div>

        {/* IFRAME A TODO ANCHO/ALTO */}
        <iframe
          title="Visor Osimis"
          src={selectedStudy.preview}
          style={{ display: 'block', width: '100%', height: '80vh', border: 0 }}
          allowFullScreen
        />
      </div>
    </div>
  </div>
)}




              {/* REPORTE */}
{activeTab === 'reporte' && (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '100%', maxWidth: 1000 }}>
      <div style={{
        border: '1px solid #E5E7EB',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#FFFFFF'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '12px 16px',
          borderBottom: '1px solid #E5E7EB'
        }}>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Reporte PDF</div>
          <a href={selectedStudy.reportPdf} target="_blank" rel="noreferrer"
             style={{ padding: '8px 12px', borderRadius: 8, background: '#0A66FF', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
            Descargar PDF
          </a>
        </div>

        {/* PDF A TODO ANCHO/ALTO */}
        <embed
          src={selectedStudy.reportPdf + '#view=FitH'}
          type="application/pdf"
          style={{ display: 'block', width: '100%', height: '80vh', border: 0 }}
        />
      </div>
    </div>
  </div>
)}





            </div>
          </div>

          <div className="pr-foot">Demo Portal de Pacientes INTECH.</div>
        </div>
      </div>
    </div>
  );
}
