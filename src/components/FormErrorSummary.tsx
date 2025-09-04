import * as React from "react";
import type { FieldErrors } from "react-hook-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

/** Utils */
const IGNORED_KEYS = new Set(["ref", "type", "types", "name", "message"]);

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return Object.prototype.toString.call(v) === "[object Object]";
}

function isTraversable(v: unknown): v is Record<string, unknown> | unknown[] {
  // Hanya array atau plain object
  if (Array.isArray(v)) return true;
  if (!isPlainObject(v)) return false;

  // Hindari DOM/react/kelas lain (Date, Map, Set, RegExp, dll)
  const tag = Object.prototype.toString.call(v);
  if (tag !== "[object Object]") return false;

  // Hindari kemungkinan React element
  if ((v as { $$typeof?: unknown }).$$typeof) return false;

  // Hindari DOM Node secara heuristik
  const maybeNode = v as { nodeType?: unknown; ownerDocument?: unknown };
  if (
    typeof maybeNode.nodeType === "number" ||
    typeof maybeNode.ownerDocument === "object"
  ) {
    return false;
  }

  return true;
}

/** Ekstrak semua pesan error tanpa masuk ke sirkular */
export function ExtracterrorMessages<T extends Record<string, unknown>>(
  errors: FieldErrors<T>
): string[] {
  const messages: string[] = [];

  const walk = (obj: unknown): void => {
    if (!obj) return;

    // Jika object memiliki "message"
    if (isPlainObject(obj) && typeof obj.message !== "undefined") {
      const m = obj.message;
      if (typeof m === "string") messages.push(m);
      else if (m != null) messages.push(String(m));
    }

    // Jika object memiliki "types"
    if (isPlainObject(obj) && isPlainObject(obj.types)) {
      Object.values(obj.types).forEach((m) => {
        if (m != null) messages.push(String(m));
      });
    }

    // Traverse ke child yang aman
    if (Array.isArray(obj)) {
      obj.forEach((item) => isTraversable(item) && walk(item));
      return;
    }

    if (isPlainObject(obj)) {
      for (const [key, value] of Object.entries(obj)) {
        if (IGNORED_KEYS.has(key)) continue; // cegah turun ke ref/dll
        if (isTraversable(value)) walk(value);
      }
    }
  };

  walk(errors);

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

  const msgs = React.useMemo(() => ExtracterrorMessages(errors), [errors]);

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
