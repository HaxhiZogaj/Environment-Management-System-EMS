import { DataManager } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ColumnDirective, ColumnsDirective, Edit, Filter, ForeignKey, GridComponent, Inject, Page, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './comment.css';

function CommentGrid() {
  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [usersDropdown, setUsersDropdown] = useState([]);
  const [reportsDropdown, setReportsDropdown] = useState([]);
  const [isReady, setIsReady] = useState(false); // Flag për të kontrolluar nëse të dhënat janë gati

  const commentApiUrl = 'https://localhost:7295/api/Comment';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentsRes, usersRes, reportsRes] = await Promise.all([
          axios.get(commentApiUrl),
          axios.get("https://localhost:7295/api/comment/dropdown/users"),
          axios.get("https://localhost:7295/api/comment/dropdown/reports"),
        ]);
        setComments(commentsRes.data);
        setUsersDropdown(usersRes.data);
        setReportsDropdown(reportsRes.data);
        setIsReady(true); // E gjitha është gati
      } catch (err) {
        console.error("Error while fetching data", err);
      }
    };
    fetchData();
  }, [refresh]);

const actionBegin = async (args) => {
  if (args.requestType === 'save') {
    try {
      // Prepare data with explicit type conversion for IDs
      const preparedData = {
        ...args.data,
        UserId: Number(args.data.UserId),
        ReportId: Number(args.data.ReportId),
      };

      console.log('Saving data:', preparedData);

      if (preparedData.CommentId) {
        // Update existing comment
        await axios.put(`${commentApiUrl}/${preparedData.CommentId}`, preparedData);
      } else {
        // Create new comment, include CreatedAt timestamp
        const commentData = {
          ReportId: preparedData.ReportId,
          UserId: preparedData.UserId,
          Content: preparedData.Content,
          CreatedAt: new Date().toISOString(),
        };
        console.log('POST data:', commentData);
        await axios.post(`${commentApiUrl}/Add`, commentData);
      }
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Error in actionBegin:', err);
      if (err.response && err.response.data) {
        console.error("Backend error details:", err.response.data);
      }
    }
  }

  if (args.requestType === 'delete') {
    try {
      const id = args.data[0]?.CommentId;
      if (id) {
        await axios.delete(`${commentApiUrl}/${id}`);
        setRefresh(prev => !prev);
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      if (err.response && err.response.data) {
        console.error("Backend error details:", err.response.data);
      }
    }
  }
};


  const userElemRef = useRef(null);
  const userDropdownRef = useRef(null);
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
        dataSource: new DataManager(usersDropdown),
        fields: { text: 'fullName', value: 'userId' },
        value: args.rowData[args.column.field],
        allowFiltering: true,
        popupHeight: '300px'
      });
      dropObj.appendTo(elem);
    }
  };
};

  // === Template për ReportId Dropdown ===
  const reportElemRef = useRef(null);
  const reportDropdownRef = useRef(null);
  const getReportDropdownEdit = () => {
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
        dataSource: new DataManager(reportsDropdown),
        fields: { text: 'title', value: 'reportId' },
        value: args.rowData[args.column.field],
        allowFiltering: true,
        popupHeight: '300px'
      });
      dropObj.appendTo(elem);
    }
  };
};

  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
  const filterSettings = { type: 'Excel' };
  const pageSettings = { pageSize: 10 };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="comments-intro">
          <h1>💬 Komentet: Fuqia e Zërit të Komunitetit</h1>
          <p>Komunikimi dhe transparenca janë thelbësore për përmirësimin e mbrojtjes mjedisore...</p>
        </div>

        <div className="custom-gradient-background">
          {isReady && (
            <GridComponent
              dataSource={comments}
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
                <ColumnDirective field="CommentId" headerText="ID" isPrimaryKey={true} width="100" textAlign="Right" isIdentity={true} />
                <ColumnDirective field="Content" headerText="Përmbajtja" width="250" validationRules={{ required: true }} />
                <ColumnDirective field="CreatedAt" headerText="Krijuar më" width="180" type="date" format="yMd" editType="datepickeredit" />

              <ColumnDirective
  field="UserId"
  headerText="Përdoruesi"
  width="150"
  dataSource={usersDropdown}
  edit={getUserDropdownEdit()}
  foreignKeyField="userId"
  foreignKeyValue="fullName"
  
/>

<ColumnDirective
  field="ReportId"
  headerText="Raporti"
  width="150"
  edit={getReportDropdownEdit()}
  foreignKeyField="reportId"
  foreignKeyValue="title"
  dataSource={reportsDropdown}
  
/>


              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, Sort, Filter, ForeignKey]} />
            </GridComponent>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentGrid;
