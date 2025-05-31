type ActionCellProps = {
  editButton: React.ReactNode
  deleteButton: React.ReactNode
}

const ActionCell = ({
  editButton,
  deleteButton,
}: ActionCellProps) => {
  return (
    <div className="flex items-center gap-0.5">
      {editButton}
      {deleteButton}
    </div>
  )
}

export default ActionCell
