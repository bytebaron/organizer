import React, from 'react';
//import { useTable } from 'react-table'
//import { DndProvider, useDrag, useDrop } from 'react-dnd'
//import HTML5Backend from 'react-dnd-html5-backend'
//import update from 'immutability-helper'

export default function Table({dti, columns, data}) {
    const [records, setRecords] = React.useState(data);

    const getRowId = React.useCallback(row => {
        return row.id
      }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable ({
        columns, 
        data: records, 
        getRowId, 
    })

    const moveRow = (dragIndex, hoverIndex) => {
        const dragRecord = records[dragIndex]
        setRecords(
            update(records, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRecord],
                ],
            })
        )
    }
    
    return (
    <DndProvider backend={HTML5Backend}>
      <table data-testid={dti} {...getTableProps()}>
          <thead>
              {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                  </tr>
              ))}
          </thead>
          <tbody {...getTableBodyProps()}>
              {rows.map(
                  (row, index) => 
                  prepareRow(row) || (
                      <Row index={index} row={row} moveRow={moveRow} {...row.getRowProps()} />
                  )
                )}
          </tbody>
      </table>
    </DndProvider>
    )
  }
 
const DND_ITEM_TYPE = 'row'

const Row = ({ row, index, moveRow }) => {
    const dropRef = React.useRef(null)
    const dragRef = React.useRef(null)
  
    const [, drop] = useDrop({
      accept: DND_ITEM_TYPE,
      hover(item, monitor) {
        if (!dropRef.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = dropRef.current.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action
        moveRow(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      },
    })
  
    const [{ isDragging }, drag, preview] = useDrag({
      item: { type: DND_ITEM_TYPE, index },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    })
  
    const opacity = isDragging ? 0 : 1
  
    preview(drop(dropRef))
    drag(dragRef)
  
    return (
      <tr ref={dropRef} style={{ opacity }}>
        <td ref={dragRef}>move</td>
        {row.cells.map(cell => {
          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
        })}
      </tr>
    )
  }
  