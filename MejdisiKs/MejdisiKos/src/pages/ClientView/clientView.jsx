import { ColumnDirective, ColumnsDirective, Edit, Filter, GridComponent, Inject, Page, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import { useEffect, useState } from "react";
import "./ClientView.css";

function ClientView() {
  const [toggleSections, setToggleSections] = useState({
    comments: false,
    reports: false,
    tips: false,
    centers: false,
    categories: false,
    votes: false,
  });

  const [data, setData] = useState({
    comments: [],
    reports: [],
    tips: [],
    centers: [],
    categories: [],
    votes: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responses = await Promise.all([
        axios.get("https://localhost:7295/api/Comment"),
        axios.get("https://localhost:7295/api/EnvironmentalReport"),
        axios.get("https://localhost:7295/api/GreenTip"),
        axios.get("https://localhost:7295/api/RecyclingCenter"),
        axios.get("https://localhost:7295/api/ReportCategory"),
        axios.get("https://localhost:7295/api/Vote"),
      ]);

      setData({
        comments: responses[0].data,
        reports: responses[1].data,
        tips: responses[2].data,
        centers: responses[3].data,
        categories: responses[4].data,
        votes: responses[5].data,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="client-view-container">
      <section className="mjedisiim-info">
  <h2>🌍 Informacione për MjedisiIm</h2>

  <div className="info-item">
    <h3>♻️ Çfarë është MjedisiIm?</h3>
    <p>MjedisiIm është një platformë e dedikuar për mbrojtjen e mjedisit, duke ofruar informacione, këshilla dhe mundësi për të kontribuar në një mjedis më të pastër dhe të qëndrueshëm.</p>
  </div>

  <div className="info-item">
    <h3>🌱 Këshilla për një mjedis më të pastër</h3>
    <ul>
      <li>Reduktoni përdorimin e plastikës duke zgjedhur produkte të riciklueshme.</li>
      <li>Përdorni transportin publik ose biçikletën për të ulur ndotjen.</li>
      <li>Mbillni pemë dhe mbështesni hapësirat e gjelbra në qytetin tuaj.</li>
    </ul>
  </div>


  <div className="info-item">
    <h3>📊 Raportet dhe statistikat</h3>
    <p>Platforma ofron të dhëna mbi ndotjen, raportet e qytetarëve dhe progresin e iniciativave mjedisore.</p>
  </div>
</section>
      <div className="info-summary">
        {Object.keys(data).map((key) => (
          <div key={key} className="info-box">
            {key.charAt(0).toUpperCase() + key.slice(1)}: {data[key].length}
          </div>
        ))}
      </div>
      
<div className="grid-wrapper">
      {Object.keys(data).map((key) => (
        <div key={key} className="collapsible-item">
          <div className="description-container" onClick={() => setToggleSections((prev) => ({ ...prev, [key]: !prev[key] }))}>
            <p>
              📋 <strong>{key.charAt(0).toUpperCase() + key.slice(1)}</strong> - Klikoni për të parë
            </p>
            <span className={`arrow ${toggleSections[key] ? "open" : ""}`}>&#9660;</span>
          </div>
          {toggleSections[key] && (
            <div className="grid-container">
              <GridComponent dataSource={data[key]} allowPaging allowSorting allowFiltering filterSettings={{ type: "Excel" }}>
                <ColumnsDirective>
                  {key === "comments" && (
                    <>
                      <ColumnDirective field="Content" headerText="Përmbajtja" width="250" />
                      <ColumnDirective field="CreatedAt" headerText="Krijuar më" width="180" type="date" format="yMd" />
                      <ColumnDirective field="UserId" headerText="Përdoruesi" width="120" />
                      <ColumnDirective field="ReportId" headerText="Raporti" width="120" />
                    </>
                  )}
                  {key === "reports" && (
                    <>
                      <ColumnDirective field="ReportId" headerText="ID" width="80" />
                      <ColumnDirective field="Title" headerText="Titulli" width="150" />
                      <ColumnDirective field="Description" headerText="Përshkrimi" width="250" />
                      <ColumnDirective field="Latitude" headerText="Gjerësia" width="120" />
                      <ColumnDirective field="Longitude" headerText="Gjatësia" width="120" />
                      <ColumnDirective field="ImageUrl" headerText="URL e Imazhit" width="200" />
                      <ColumnDirective field="Status" headerText="Statusi" width="120" />
                    </>
                  )}
                  {key === "tips" && (
                    <>
                      <ColumnDirective field="TipId" headerText="ID" width="100" />
                      <ColumnDirective field="Title" headerText="Titulli" width="200" />
                      <ColumnDirective field="Content" headerText="Përmbajtja" width="300" />
                      <ColumnDirective field="Category" headerText="Kategoria" width="200" />
                    </>
                  )}
                  {key === "centers" && (
                    <>
                      <ColumnDirective field="CenterId" headerText="ID" width="80" />
                      <ColumnDirective field="Name" headerText="Emri" width="200" />
                      <ColumnDirective field="Latitude" headerText="Gjerësia" width="120" />
                      <ColumnDirective field="Longitude" headerText="Gjatësia" width="120" />
                      <ColumnDirective field="Address" headerText="Adresa" width="250" />
                      <ColumnDirective field="Contact" headerText="Kontakti" width="200" />
                    </>
                  )}
                  {key === "categories" && (
                    <>
                      <ColumnDirective field="CategoryId" headerText="ID" width="80" />
                      <ColumnDirective field="Name" headerText="Emri i Kategorisë" width="200" />
                      <ColumnDirective field="Description" headerText="Përshkrimi" width="250" />
                    </>
                  )}
                  {key === "votes" && (
                    <>
                      <ColumnDirective field="VoteId" headerText="ID" isPrimaryKey width="80" isIdentity />
                      <ColumnDirective field="Type" headerText="Tipi" width="150" validationRules={{ required: true }} />
                      <ColumnDirective field="ReportId" headerText="ID e Raportit" width="130" />
                      <ColumnDirective field="UserId" headerText="ID e Përdoruesit" width="130" />
                      <ColumnDirective field="VotedAt" headerText="Votuar më" width="180" type="date" format="yMd" editType="datepickeredit" />
                    </>
                  )}
                </ColumnsDirective>
                <Inject services={[Page, Sort, Filter, Toolbar, Edit]} />
              </GridComponent>
            </div>
          )}
        </div>
      ))}
    </div>
     </div>
  );
}

export default ClientView;