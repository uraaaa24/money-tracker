import { PopoverClose } from '@radix-ui/react-popover'
import { Pen, Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

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

const DeleteButton = ({ itemId, onDelete }: DeleteButtonProps) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer text-red-500 hover:text-red-600"
      >
        <span className="sr-only">Delete</span>
        <Trash />
      </Button>
    </PopoverTrigger>

    <PopoverContent
      side="top"
      align="center"
      className="w-44 rounded-xl p-4 text-center space-y-4"
    >
      <p className="text-sm font-medium">
        Are you sure?
      </p>

      <div className="flex justify-center gap-2">
        <PopoverClose asChild>
          <Button variant="outline" size="sm"
            className='cursor-pointer'
          >
            Cancel
          </Button>
        </PopoverClose>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(itemId)}
          className="cursor-pointer text-red-500 border-red-200 hover:text-red-600 hover:bg-red-500/10"
        >
          Delete
        </Button>
      </div>
    </PopoverContent>
  </Popover>
)


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
