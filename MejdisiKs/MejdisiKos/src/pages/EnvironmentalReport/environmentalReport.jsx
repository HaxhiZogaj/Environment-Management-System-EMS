/*  import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  Filter,
  GridComponent,
  Inject,
  Page,
  Sort,
  Toolbar,
} from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './envorinmetnalReport.css';

function EnvironmentalReport() {
  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize: 10 };

  const apiUrl = 'https://localhost:7295/api/EnvironmentalReport';

  useEffect(() => {
    axios.get(apiUrl)
      .then(res => setReports(res.data))
      .catch(err => console.error(err));
  }, [refresh]);


  const actionBegin = async (args) => {
  if (args.requestType === 'save') {
    const reportData = {
   ReportId: args.data.ReportId,  
  Title: args.data.Title,
  Description: args.data.Description,
  Latitude: args.data.Latitude,
  Longitude: args.data.Longitude,
  ImageUrl: args.data.ImageUrl,
  Status: args.data.Status,
  CreatedAt: args.data.CreatedAt,
  UserId: args.data.UserId,
  CategoryId: args.data.CategoryId
    };

    if (args.data.ReportId) {
  reportData.ReportId = args.data.ReportId;
  await axios.put(`${apiUrl}/${args.data.ReportId}`, reportData);
}
else {
      await axios.post(`${apiUrl}/Add`, reportData);
    }
    setRefresh(prev => !prev);
  }

  if (args.requestType === 'delete') {
    const id = args.data[0]?.ReportId;  
    if (id) {
      await axios.delete(`${apiUrl}/${id}`);
      setRefresh(prev => !prev);
    }
  }
};


return (
  <div className="control-pane">
    <div className="control-section">

      <div className="environmental-report-intro">
        <h1>📑 Raportet Mjedisore: Monitorimi i Gjendjes së Planetit</h1>
        <p>
          Mbrojtja e mjedisit fillon me **njohjen dhe raportimin** e problemeve që ndikojnë 
          ekosistemet tona. **Raportet mjedisore** luajnë një rol kyç në identifikimin e 
          sfidave ekologjike, dokumentimin e ndotjes dhe zhvillimin e strategjive për 
          përmirësimin e kushteve mjedisore.
        </p>
        <h2>🌍 Pse janë të rëndësishme raportet mjedisore?</h2>
        <ul>
          <li><strong>Monitorimi i ndotjes</strong> – Identifikon burimet kryesore të ndotjes.</li>
          <li><strong>Vendimmarrje më e mirë</strong> – Ofron të dhëna për politikat mjedisore.</li>
          <li><strong>Ndërgjegjësim publik</strong> – Informon komunitetin mbi sfidat ekologjike.</li>
        </ul>

        <p>
          **Raportimi i duhur sjell ndryshim!** Bashkohuni me ne për të dokumentuar dhe 
          adresuar sfidat mjedisore, duke kontribuar për një botë më të pastër dhe të sigurt. 📑🌍  
        </p>
      </div>

      <div className="custom-gradient-background">
        <GridComponent
          dataSource={reports}
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
            <ColumnDirective field="ReportId" headerText="ID" isPrimaryKey={true} width="80" textAlign="Right" isIdentity={true} />
            <ColumnDirective field="Title" headerText="Titulli" width="150" validationRules={{ required: true }} />
            <ColumnDirective field="Description" headerText="Përshkrimi" width="250" />
            <ColumnDirective field="Latitude" headerText="Gjerësia" width="120" textAlign="Right" />
            <ColumnDirective field="Longitude" headerText="Gjatësia" width="120" textAlign="Right" />
            <ColumnDirective field="ImageUrl" headerText="URL e Imazhit" width="200" />
            <ColumnDirective field="Status" headerText="Statusi" width="120" />
            <ColumnDirective field="CreatedAt" headerText="Krijuar më" width="160" type="date" format="yMd" editType="datepickeredit" />
            <ColumnDirective field="UserId" headerText="ID e Përdoruesit" width="120" textAlign="Right" />
            <ColumnDirective field="CategoryId" headerText="ID e Kategorisë" width="120" textAlign="Right" />
          </ColumnsDirective>
          <Inject services={[Page, Toolbar, Edit, Sort, Filter]} />
        </GridComponent>
      </div>

    </div>
  </div>
);
}

export default EnvironmentalReport;
 

 */




import { DataManager } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ColumnDirective, ColumnsDirective, Edit, Filter, ForeignKey, GridComponent, Inject, Page, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './envorinmetnalReport.css';

function EnvironmentalReport() {
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refresh, setRefresh] = useState(false);
 const [isReady, setIsReady] = useState(false); 
  const apiUrl = 'https://localhost:7295/api/EnvironmentalReport';

  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize: 10 };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reportsRes, usersRes, categoriesRes] = await Promise.all([
          axios.get(apiUrl),
          axios.get("https://localhost:7295/api/comment/dropdown/users"),
          axios.get("https://localhost:7295/api/environmentalreport/dropdown/categories"),
        ]);
        setReports(reportsRes.data);
        setUsers(usersRes.data);
        setCategories(categoriesRes.data);
setIsReady(true);

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [refresh]);

  const actionBegin = async (args) => {
    if (args.requestType === 'save') {
      const data = {
        ...args.data,
        UserId: Number(args.data.UserId),
        CategoryId: Number(args.data.CategoryId),
      };
      if (args.data.ReportId) {
        await axios.put(`${apiUrl}/${data.ReportId}`, data);
      } else {
        const somedata = {
          Title: data.Title,
          Description: data.Description,
          Latitude: data.Latitude,
          Longitude: data.Longitude,
          ImageUrl: data.ImageUrl,
          Status: data.Status,
          CreatedAt: data.CreatedAt || new Date().toISOString(),
          UserId: data.UserId,
          CategoryId: data.CategoryId
        };

        await axios.post(`${apiUrl}/Add`, somedata);
      }
      setRefresh(prev => !prev);
    }
    

    if (args.requestType === 'delete') {
      const id = args.data[0]?.ReportId;
      if (id) {
        await axios.delete(`${apiUrl}/${id}`);
        setRefresh(prev => !prev);
      }
    }
  };

  const getUserDropdownEdit = () => {
    let elem, dropObj;
    return {
      create: () => {
        elem = document.createElement('input');
        return elem;
      },
      destroy: () => {
        if (dropObj) dropObj.destroy();
      },
      read: () => dropObj?.value,
      write: (args) => {
        dropObj = new DropDownList({
          dataSource: new DataManager(users),
          fields: { text: 'fullName', value: 'userId' },
          value: args.rowData[args.column.field],
          allowFiltering: true,
          popupHeight: '300px'
        });
        dropObj.appendTo(elem);
      }
    };
  };

  const getCategoryDropdownEdit = () => {
    let elem, dropObj;
    return {
      create: () => {
        elem = document.createElement('input');
        return elem;
      },
      destroy: () => {
        if (dropObj) dropObj.destroy();
      },
      read: () => dropObj?.value,
      write: (args) => {
        dropObj = new DropDownList({
          dataSource: new DataManager(categories),
          fields: { text: 'name', value: 'categoryId' },
          value: args.rowData[args.column.field],
          allowFiltering: true,
          popupHeight: '300px'
        });
        dropObj.appendTo(elem);
      }
    };
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="environmental-report-intro">
          <h1>📑 Raportet Mjedisore: Monitorimi i Gjendjes së Planetit</h1>
          <p>
            Mbrojtja e mjedisit fillon me <strong>njohjen dhe raportimin</strong> e problemeve që ndikojnë
            ekosistemet tona. <strong>Raportet mjedisore</strong> luajnë një rol kyç në identifikimin e
            sfidave ekologjike, dokumentimin e ndotjes dhe zhvillimin e strategjive për
            përmirësimin e kushteve mjedisore.
          </p>
        </div>

        <div className="custom-gradient-background">
         {isReady && ( <GridComponent
            dataSource={reports}
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
              <ColumnDirective field="ReportId" headerText="ID" isPrimaryKey={true} width="80" textAlign="Right" isIdentity={true} />
              <ColumnDirective field="Title" headerText="Titulli" width="150" validationRules={{ required: true }} />
              <ColumnDirective field="Description" headerText="Përshkrimi" width="250" />
              <ColumnDirective field="Latitude" headerText="Gjerësia" width="120" textAlign="Right" />
              <ColumnDirective field="Longitude" headerText="Gjatësia" width="120" textAlign="Right" />
              <ColumnDirective field="ImageUrl" headerText="URL e Imazhit" width="200" />
              <ColumnDirective field="Status" headerText="Statusi" width="120" />
              <ColumnDirective field="CreatedAt" headerText="Krijuar më" width="160" type="date" format="yMd" editType="datepickeredit" />
             <ColumnDirective
  field="UserId"
  headerText="Përdoruesi"
  width="150"
  dataSource={users}
  edit={getUserDropdownEdit()}
  foreignKeyField="userId"
  foreignKeyValue="fullName"
/>

<ColumnDirective
  field="CategoryId"
  headerText="Kategori"
  width="150"
  dataSource={categories}
  edit={getCategoryDropdownEdit()}
  foreignKeyField="categoryId"
  foreignKeyValue="name"
/>

            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit, Sort, Filter, ForeignKey]} />
          </GridComponent>
          )} </div>
      </div>
    </div>
  );
}

export default EnvironmentalReport;

