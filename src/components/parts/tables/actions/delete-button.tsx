import { PopoverClose } from '@radix-ui/react-popover'
import { Trash } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type ActionCellDeleteButtonProps = {
  itemId: number
  onDelete: (itemId: number) => void
}

const ActionCellDeleteButton = ({ itemId, onDelete }: ActionCellDeleteButtonProps) => (
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

    <PopoverContent side="top" align="center" className="w-44 rounded-xl p-4 text-center space-y-4">
      <p className="text-sm font-medium">Are you sure?</p>

      <div className="flex justify-center gap-2">
        <PopoverClose asChild>
          <Button variant="outline" size="sm" className="cursor-pointer">
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

export default ActionCellDeleteButton
