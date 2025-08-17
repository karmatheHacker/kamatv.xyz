"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface NoticeModalProps {
  onClose: () => void
}

export function NoticeModal({ onClose }: NoticeModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold font-work-sans text-center text-primary">NOTICE</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-center">
          <p className="text-muted-foreground leading-relaxed">
            Site may display ads as it relies on free APIs that include advertisements. For an improved browsing
            experience, consider using an ad-blocking extension.
          </p>

          <p className="text-sm text-muted-foreground italic">~Rabin (dev)</p>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Got it!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
