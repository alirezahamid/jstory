import "./cell-list.css"
import { Fragment, useEffect } from "react"
import { useTypedSelector } from "../hooks/use-typed-selector"
import CellListItem from "./cell-list-item"
import AddCell from "./add-cell"
import { useActions } from "../hooks/use-actions"

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }: any) => {
    return order.map((id: any) => data[id])
  })
  const { fetchCells, saveCells } = useActions()

  useEffect(() => {
    fetchCells()
  }, [])

  const renderedCells = cells.map((cell: any) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))
  return (
    <div className="cell-list">
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
