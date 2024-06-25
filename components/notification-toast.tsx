"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ToastWithTitle(title:string, description:string) {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {

      }}
    >
      Show Toast
    </Button>
  )
}
