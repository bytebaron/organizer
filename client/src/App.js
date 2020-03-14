import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Table from './components/Table';
import styled from 'styled-components'

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

  const currentData = [
        {time: "9:00", description: "Wake up and eat breakfast."},
      ]

  const columns = React.useMemo(
    () => [
      {
        Header: 'Time',
        accessor: 'time',
      },
      {
        Header: 'Description',
        accessor: 'description',
      }
    ], []
  )

  return (
    <Container className="app" fluid>
      <Styles>
        <Table data-testid={"table"} columns={columns} data={currentData}/>
      </Styles>
    </Container>
  );
}

export default App;

