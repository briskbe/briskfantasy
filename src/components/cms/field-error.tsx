"use client";

import { FieldError as HeroUIFieldError } from "@heroui/react";
import type { ComponentProps, HTMLInputTypeAttribute } from "react";

type DutchFieldErrorProps = Omit<ComponentProps<typeof HeroUIFieldError>, "children"> & {
  type?: HTMLInputTypeAttribute;
  min?: string | number;
  max?: string | number;
  minLength?: number;
  maxLength?: number;
};

function formatLimit(value: string | number, type?: HTMLInputTypeAttribute) {
  if (type === "date" || type === "datetime-local") {
    const parsed = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("nl-BE", {
        dateStyle: "short",
        ...(type === "datetime-local" ? { timeStyle: "short" } : {}),
      }).format(parsed);
    }
  }
  const number = Number(value);
  return Number.isFinite(number) ? new Intl.NumberFormat("nl-BE").format(number) : String(value);
}

/** Keep HeroUI's validation behavior and styling, without browser-language messages. */
export function DutchFieldError({ type, min, max, minLength, maxLength, ...props }: DutchFieldErrorProps) {
  return (
    <HeroUIFieldError {...props}>
      {({ validationDetails }) => {
        const isDate = type === "date" || type === "datetime-local";
        if (validationDetails.valueMissing) {
          return type === "checkbox" ? "Bevestig je akkoord om verder te gaan." : "Dit veld is verplicht.";
        }
        if (validationDetails.typeMismatch) {
          if (type === "email") return "Vul een geldig e-mailadres in.";
          if (type === "url") return "Vul een geldig webadres in.";
          return "Vul een geldige waarde in.";
        }
        if (validationDetails.tooShort) {
          return minLength !== undefined ? `Gebruik minstens ${minLength} tekens.` : "De invoer is te kort.";
        }
        if (validationDetails.tooLong) {
          return maxLength !== undefined ? `Gebruik maximaal ${maxLength} tekens.` : "De invoer is te lang.";
        }
        if (validationDetails.rangeUnderflow) {
          return min !== undefined
            ? isDate ? `Kies een datum vanaf ${formatLimit(min, type)}.` : `De waarde moet minstens ${formatLimit(min)} zijn.`
            : isDate ? "Kies een latere datum." : "De waarde is te laag.";
        }
        if (validationDetails.rangeOverflow) {
          return max !== undefined
            ? isDate ? `Kies een datum tot en met ${formatLimit(max, type)}.` : `De waarde mag maximaal ${formatLimit(max)} zijn.`
            : isDate ? "Kies een eerdere datum." : "De waarde is te hoog.";
        }
        if (validationDetails.badInput || validationDetails.stepMismatch) {
          return isDate ? "Vul een geldige datum in." : type === "number" ? "Vul een geldig getal in." : "Vul een geldige waarde in.";
        }
        if (validationDetails.patternMismatch) return "Gebruik de gevraagde notatie.";
        return "Controleer de ingevulde waarde.";
      }}
    </HeroUIFieldError>
  );
}
