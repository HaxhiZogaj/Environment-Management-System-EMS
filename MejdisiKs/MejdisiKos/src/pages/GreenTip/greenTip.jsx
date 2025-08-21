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
import './greenTip.css';

function GreenTipGrid() {
  const [tips, setTips] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const apiUrl = 'https://localhost:7295/api/GreenTip';

  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize: 10 };

  useEffect(() => {
    axios.get(apiUrl)
      .then(res => setTips(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const actionBegin = async (args) => {
    if (args.requestType === 'save') {
      if (args.data.TipId) {
        // Update
        await axios.put(`${apiUrl}`, args.data);
      } else {
        // Create
        const newTip = {
          Title: args.data.Title,
          Content: args.data.Content,
          Category: args.data.Category
        };
        console.log("Sending tip data:", newTip);
        await axios.post(`${apiUrl}/Add`, newTip);
      }
      setRefresh(prev => !prev);
    }

    if (args.requestType === 'delete') {
      const id = args.data[0]?.TipId;
      if (id) {
        await axios.delete(`${apiUrl}/${id}`);
        setRefresh(prev => !prev);
      }
    }
  };

return (
  <div className="control-pane">
    <div className="control-section">
      <div className="green-tip-intro">
        <h1>🌿 Këshillat e Gjelbra: Mënyra e Qëndrueshme për të Jetuar</h1>
        <p>
          Ruajtja e mjedisit fillon me **vendime të zgjuara dhe të qëndrueshme**. 
          **Këshillat e Gjelbra** ndihmojnë individët dhe komunitetin të bëjnë 
          zgjedhje të qëndrueshme që ndikojnë pozitivisht planetin tonë.  
        </p>
        <h2>🌍 Pse janë të rëndësishme këshillat e gjelbra?</h2>
        <ul>
          <li><strong>Kursimi i Burimeve</strong> – Redukton konsumin e ujit dhe energjisë.</li>
          <li><strong>Mbrojtja e Natyrës</strong> – Ul ndotjen dhe zvogëlon mbetjet plastike.</li>
          <li><strong>Ekonomi e Qëndrueshme</strong> – Redukton kostot duke përdorur burime natyrore në mënyrë të mençur.</li>
        </ul>
        <p>
          **Çdo veprim ka rëndësi!** Zbatimi i këshillave të gjelbra është 
          hapi i parë drejt një mjedisi të pastër dhe të qëndrueshëm. 🌿♻  
        </p>
      </div>

      <div className="custom-gradient-background">
        <GridComponent
          dataSource={tips}
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
            <ColumnDirective field="TipId" headerText="ID" isPrimaryKey={true} width="100" textAlign="Right" isIdentity={true} />
            <ColumnDirective field="Title" headerText="Titulli" width="200" validationRules={{ required: true }} />
            <ColumnDirective field="Content" headerText="Përmbajtja" width="300" validationRules={{ required: true }} />
            <ColumnDirective field="Category" headerText="Kategoria" width="200" />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>

    </div>
  </div>
);

  
}

export default GreenTipGrid;
