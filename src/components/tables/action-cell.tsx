import { Pen, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

type EditButtonProps<T> = {
  item: T
  onEdit: (item: T) => void
}

export const EditButton = <T,>({ item, onEdit }: EditButtonProps<T>) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer text-green-400 hover:text-green-500"
      onClick={() => onEdit(item)}
    >
      <span className="sr-only">Edit</span>
      <Pen />
    </Button>
  )
}

type DeleteButtonProps = {
  itemId: number
  onDelete: (itemId: number) => void
}

const DeleteButton = ({ itemId, onDelete }: DeleteButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer text-red-400 hover:text-red-500"
      onClick={() => onDelete(itemId)}
    >
      <span className="sr-only">Delete</span>
      <Trash />
    </Button>
  )
}

type ActionCellProps<T extends { id: number }> = {
  item: T
  onEdit: (item: T) => void
  onDelete: (itemId: number) => void
}

const ActionCell = <T extends { id: number }>({ item, onEdit, onDelete }: ActionCellProps<T>) => {
  return (
    <div className="flex items-center gap-0.5">
      <EditButton item={item} onEdit={onEdit} />
      <DeleteButton itemId={item.id} onDelete={onDelete} />
    </div>
  )
}

export default ActionCell
