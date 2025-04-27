"use client"

import { z } from "zod"

export const ADD_TRANSACTION_FORM_NAMES = {
  USERNAME: "username", // example
}

export const formSchema = z.object({
  username: z.string().min(2).max(50), // example
})
