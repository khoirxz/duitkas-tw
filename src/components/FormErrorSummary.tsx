import * as React from "react";
import type { FieldErrors, FieldError } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

/** Ambil semua pesan error secara rekursif */
function extractErrorMessages<T extends Record<string, unknown>>(
  errors: FieldErrors<T>
): string[] {
  const messages: string[] = [];

  const walk = (obj: FieldErrors<T> | FieldError | undefined): void => {
    if (!obj) return;

    // Jika ini adalah error langsung (ada message)
    if ("message" in obj && obj.message) {
      messages.push(String(obj.message));
    }

    // Jika punya multiple types
    if ("types" in obj && obj.types) {
      Object.values(obj.types).forEach((m) => {
        if (m) messages.push(String(m));
      });
    }

    // Loop semua key child (termasuk array index)
    Object.values(obj).forEach((value) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          walk(item as FieldErrors<T> | FieldError | undefined);
        });
      } else if (typeof value === "object" && value !== null) {
        walk(value as FieldErrors<T> | FieldError | undefined);
      }
    });
  };

  walk(errors);

  // Hapus duplikat & kosong
  return Array.from(new Set(messages)).filter(Boolean);
}

type FormErrorSummaryProps<T extends Record<string, unknown>> = {
  errors: FieldErrors<T>;
  firstOnly?: boolean;
  hideWhenEmpty?: boolean;
};

export function FormErrorSummary<T extends Record<string, unknown>>({
  errors,
  firstOnly = false,
  hideWhenEmpty = true,
}: FormErrorSummaryProps<T>) {
  const [dismissed, setDismissed] = React.useState(false);

  const msgs = React.useMemo(() => extractErrorMessages(errors), [errors]);

  React.useEffect(() => {
    if (msgs.length > 0) setDismissed(false);
  }, [msgs]);

  if (hideWhenEmpty && msgs.length === 0) return null;
  if (dismissed) return null;

  const display = firstOnly ? msgs.slice(0, 1) : msgs;

  return (
    <Alert variant="destructive" className="bg-red-200/50 border-0">
      <AlertDescription className="flex justify-between items-start gap-2">
        <div className="space-y-1 leading-relaxed">
          {display.length === 1 ? (
            <span>{display[0]}</span>
          ) : (
            <ul className="list-disc pl-5">
              {display.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDismissed(true)}
          className="shrink-0 hover:bg-red-300"
          aria-label="Dismiss error">
          <XIcon className="h-4 w-4 text-red-600" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
