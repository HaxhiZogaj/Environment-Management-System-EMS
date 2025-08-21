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
import './reportCategory.css';

function ReportCategory() {
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const apiUrl = 'https://localhost:7295/api/ReportCategory';

  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize: 10 };

  useEffect(() => {
    axios.get(apiUrl)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [refresh]);

  const actionBegin = async (args) => {
    if (args.requestType === 'save') {
      if (args.data.CategoryId) {
        // Update
        //await axios.put(`${apiUrl}`, args.data); // ne kete form nuk bon sepse nuk e specifikon qfar id po merr kshtu qe e vendosmi args.data.CategoryId
       await axios.put(`${apiUrl}/${args.data.CategoryId}`, args.data);
      } else {
        // Create
        const newCategory = {
          Name: args.data.Name
        };
        console.log("Sending category data:", newCategory);
        await axios.post(`${apiUrl}/Add`, newCategory);
      }
      setRefresh(prev => !prev);
    }

    if (args.requestType === 'delete') {
      const id = args.data[0]?.categoryId;
      if (id) {
        await axios.delete(`${apiUrl}/${id}`);
        setRefresh(prev => !prev);
      }
    }
  };

  return (
  <div className="control-pane">
    <div className="control-section">

      <div className="report-category-intro">
        <h1>📊 Kategoritë e Raportimit: Ndihmë për një Mjedis më të Pastër</h1>
        <p>
          Raportimi i problemeve mjedisore luan një rol kyç në identifikimin dhe adresimin e sfidave 
          që prekin komunitetin tonë. **Sistemi ynë i kategorizimit të raporteve** lehtëson procesin 
          e menaxhimit të informacioneve, duke ndihmuar autoritetet dhe qytetarët të marrin masa të 
          duhura në mbrojtjen e mjedisit.
        </p>
        <h2>🌍 Pse është e rëndësishme kategorizimi i raporteve?</h2>
        <ul>
          <li><strong>Menaxhim më i lehtë</strong> – Organizimi i të dhënave për përgjigje të shpejtë.</li>
          <li><strong>Ndikim më i madh</strong> – Raporte të strukturuara ndihmojnë në analizimin efektiv të problemeve.</li>
          <li><strong>Zgjidhje më të sakta</strong> – Kategoritë ndihmojnë në përcaktimin e veprimeve të duhura.</li>
        </ul>

        <p>
          **Raportimi është fuqi!** Bashkohuni me ne për të identifikuar dhe adresuar sfidat mjedisore, 
          duke kontribuar për një botë më të pastër dhe të sigurt. 📊🌍  
        </p>
      </div>

      {/* === Grid Below the Description === */}
      <div className="custom-gradient-background">
        <GridComponent
          dataSource={categories}
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
            <ColumnDirective field="CategoryId" headerText="ID" isPrimaryKey={true} width="100" textAlign="Right" isIdentity={true} />
            <ColumnDirective field="Name" headerText="Emri i Kategorisë së Raportimit" width="250" validationRules={{ required: true }} />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>

    </div>
  </div>
);
}

export default ReportCategory;
