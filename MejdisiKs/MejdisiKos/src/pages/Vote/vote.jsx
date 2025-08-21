import { DataManager } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  Filter,
  ForeignKey,
  GridComponent,
  Inject,
  Page,
  Sort,
  Toolbar
} from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './vote.css';

function Vote() {
  const [votes, setVotes] = useState([]);
  const [usersDropdown, setUsersDropdown] = useState([]);
  const [reportsDropdown, setReportsDropdown] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const voteApiUrl = 'https://localhost:7295/api/Vote';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [votesRes, usersRes, reportsRes] = await Promise.all([
          axios.get(voteApiUrl),
          axios.get("https://localhost:7295/api/comment/dropdown/users"),
          axios.get("https://localhost:7295/api/comment/dropdown/reports"),
        ]);
        setVotes(votesRes.data);
        setUsersDropdown(usersRes.data);
        setReportsDropdown(reportsRes.data);
        setIsReady(true);
      } catch (err) {
        console.error("Error while fetching data", err);
      }
    };
    fetchData();
  }, [refresh]);

  const actionBegin = async (args) => {
    try {
      if (args.requestType === 'save') {
        const preparedData = {
          ...args.data,
          UserId: Number(args.data.UserId),
          ReportId: Number(args.data.ReportId),
        };

        console.log('Saving data:', preparedData);

        if (preparedData.VoteId) {
          await axios.put(`${voteApiUrl}/${preparedData.VoteId}`, preparedData);
        } else {
          const newVote = {
            Type: preparedData.Type,
            ReportId: preparedData.ReportId,
            UserId: preparedData.UserId,
            VotedAt: new Date().toISOString(),
          };
          await axios.post(`${voteApiUrl}/Add`, newVote);
        }
        setRefresh(prev => !prev);
      }

      if (args.requestType === 'delete') {
        const id = args.data[0]?.VoteId;
        if (id) {
          await axios.delete(`${voteApiUrl}/${id}`);
          setRefresh(prev => !prev);
        }
      }
    } catch (err) {
      console.error("Error in actionBegin:", err);
    }
  };

  const getDropdownEdit = (dataSource, textField, valueField) => {
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
          dataSource: new DataManager(dataSource),
          fields: { text: textField, value: valueField },
          value: args.rowData[args.column.field],
          allowFiltering: true,
          popupHeight: '300px',
        });
        dropObj.appendTo(elem);
      }
    };
  };

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="vote-intro">
          <h1>🗳 Votimi: Fuqizimi i Komunitetit për Vendime më të Mira</h1>
          <p>**Zëri juaj ka ndikim!** Përdoreni të drejtën për të votuar dhe ndihmoni në përmirësimin e vendimeve që ndikojnë në komunitetin tonë dhe mjedisin.</p>
        </div>

        <div className="custom-gradient-background">
          {isReady && (
            <GridComponent
              dataSource={votes}
              toolbar={['Add', 'Edit', 'Delete']}
              allowPaging={true}
              pageSettings={{ pageSize: 10 }}
              allowSorting={true}
              allowFiltering={true}
              filterSettings={{ type: 'Excel' }}
              editSettings={{ allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' }}
              actionBegin={actionBegin}
            >
              <ColumnsDirective>
                <ColumnDirective field="VoteId" headerText="ID" isPrimaryKey={true} width="80" textAlign="Right" isIdentity={true} />
                <ColumnDirective field="Type" headerText="Tipi" width="150" validationRules={{ required: true }} />
                <ColumnDirective field="VotedAt" headerText="Votuar më" width="180" type="date" format="yMd" editType="datepickeredit" />
                <ColumnDirective 
                  field="UserId" 
                  headerText="Përdoruesi" 
                  width="150" 
                  edit={getDropdownEdit(usersDropdown, 'fullName', 'userId')} 
                  foreignKeyField="userId" 
                  foreignKeyValue="fullName" 
                  dataSource={usersDropdown} 
                />
                <ColumnDirective 
                  field="ReportId" 
                  headerText="Raporti" 
                  width="150" 
                  edit={getDropdownEdit(reportsDropdown, 'title', 'reportId')} 
                  foreignKeyField="reportId" 
                  foreignKeyValue="title" 
                  dataSource={reportsDropdown} 
                />
              </ColumnsDirective>
              <Inject services={[Page, Toolbar, Edit, Sort, Filter,ForeignKey]} />
            </GridComponent>
          )}
        </div>
      </div>
    </div>
  );
}

export default Vote;