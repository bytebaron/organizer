import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './components/Table/Table';
import NewItemModal from './components/NewItemModal/NewItemModal'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

const Styles = styled.div`
    padding: 1rem;

    table {
        border-spacing: 0;
        border: 1px solid black;

        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
        }
        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid black;
            border-right: 1px solid black;

            :last-child {
                border-right: 0;
            }
        }
    }
`
function App() {
  const data = [
    {time: "9:00", description: "Wake up and eat breakfast."}, 
    {time: "10:00", description: "123143."}, 
    {time: "11:00", description: "4324234"},
  ]
  // const [newItemModal, openCloseModal] = useState(false); 
  // const [currentData, updateData] = useState(data)
  

  const columns = React.useMemo(
    () => [
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Goals Worked Towards',
        accessor: 'goals'
      }
    ], []
  )

  // function handleOpen() {
  //   openCloseModal(true);
  // }

  // function handleClose() {
  //   openCloseModal(false); 
  // }

  // function addNewItem(item) {
  //   let tempCurrentData = [...currentData];
  //   tempCurrentData.push(item);
  //   updateData(tempCurrentData);
  

  return (
    // <Container className="app" disableGutters maxWidth="false">
    //   {newItemModal ? <NewItemModal handleClose={handleClose} addNewItem={addNewItem} /> : null}
    //   <Button onClick={() => openCloseModal(true)} variant="contained" color="primary">Add new item</Button>
      <Styles>
        <Table dti={"table"} columns={columns} data={currentData}/>
      </Styles>
    // </Container>
  );
}

export default App;

