"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  selected: Date | undefined
  onSelect: (_date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}

const SingleDatePicker = ({ selected, onSelect, disabled }: DatePickerProps) => {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full min-w-0 pl-3 text-left font-normal cursor-pointer",
            !selected && "text-muted-foreground",
          )}
        >
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default SingleDatePicker
