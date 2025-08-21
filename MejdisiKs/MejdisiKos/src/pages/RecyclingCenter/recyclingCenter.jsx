import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  Filter,
  GridComponent,
  Inject,
  Page,
  Sort,
  Toolbar
} from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './recyclingCenter.css';

function RecyclingCenter() {
  const [centers, setCenters] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const apiUrl = 'https://localhost:7295/api/RecyclingCenter';

  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const editSettings = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
  };
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize: 10 };

  useEffect(() => {
    axios.get(apiUrl)
      .then(res => setCenters(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const actionBegin = async (args) => {
    if (args.requestType === 'save') {
      if (args.data.CenterId) {
        // Update
        await axios.put(`${apiUrl}`, args.data);
      } else {
        // Create
        const newCenter = {
          Name: args.data.Name,
          Latitude: args.data.Latitude,
          Longitude: args.data.Longitude,
          Address: args.data.Address,
          Contact: args.data.Contact
        };
        console.log("Sending new recycling center:", newCenter);
        await axios.post(`${apiUrl}/Add`, newCenter);
      }
      setRefresh(prev => !prev);
    }

    if (args.requestType === 'delete') {
      const id = args.data[0]?.CenterId;
      if (id) {
        await axios.delete(`${apiUrl}/${id}`);
        setRefresh(prev => !prev);
      }
    }
  };

return (
  <div className="control-pane">
    <div className="control-section">

      <div className="recycling-intro">
        <h1>♻ Qendra e Riciklimit: Ndërtimi i një të Ardhme të Qëndrueshme</h1>
        <p>
          Menaxhimi i mbetjeve nuk është më vetëm një domosdoshmëri—është një përgjegjësi! 
          <strong>Qendrat tona të Riciklimit</strong> janë pika kyçe për ruajtjen e mjedisit, 
          uljen e ndotjes dhe ruajtjen e burimeve natyrore.
        </p>
        <h2>🌍 Pse është e rëndësishme riciklimi?</h2>
        <ul>
          <li><strong>Mbrojtja e Mjedisit</strong> – Ul ndotjen dhe mbron ekosistemet natyrore.</li>
          <li><strong>Ruajtja e Energjisë</strong> – Kursen burime dhe redukton nevojën për materiale të reja.</li>
          <li><strong>Zhvillim Ekonomik</strong> – Mbështet industritë lokale përmes riciklimit të materialeve të vlefshme.</li>
        </ul>
      </div>

      {/* === Grid Below the Description === */}
      <div className="custom-gradient-background">
        <GridComponent
          dataSource={centers}
          toolbar={toolbarOptions}
          allowPaging={true}
          pageSettings={pageSettings}
          allowSorting={true}
          allowFiltering={true}
          filterSettings={filterSettings}
          editSettings={editSettings}
          actionBegin={actionBegin}
        >
          <ColumnsDirective>
            <ColumnDirective field="CenterId" headerText="ID" isPrimaryKey={true} width="80" textAlign="Right" isIdentity={true} />
            <ColumnDirective field="Name" headerText="Emri" width="200" validationRules={{ required: true }} />
            <ColumnDirective field="Latitude" headerText="Gjerësia" width="120" textAlign="Right" />
            <ColumnDirective field="Longitude" headerText="Gjatësia" width="120" textAlign="Right" />
            <ColumnDirective field="Address" headerText="Adresa" width="250" />
            <ColumnDirective field="Contact" headerText="Kontakti" width="200" />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>

    </div>
  </div>
);
}

export default RecyclingCenter;
