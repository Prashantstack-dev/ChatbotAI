import { Shield, Lock } from 'lucide-react'

export function ChatFooter() {
  return (
    <div className="px-4 py-3 border-t border-border bg-muted/30">
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          <span>Your data stays private</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <div className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5" />
          <span>Not used for training</span>
        </div>
      </div>
      <p className="text-center text-[10px] text-muted-foreground/70 mt-2">
        Conversations are encrypted and never shared with third parties.
      </p>
    </div>
  )
}