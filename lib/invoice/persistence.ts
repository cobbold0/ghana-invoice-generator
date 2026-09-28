import { invoiceSchema, type Invoice } from "./schema";

export const DRAFT_KEY = "gig:draft:v1";

/** Returns the saved draft, or null if missing, unreadable or corrupt. */
export function loadDraft(storage: Storage = localStorage): Invoice | null {
  try {
    const raw = storage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = invoiceSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** Saves the draft locally. Returns false if storage is unavailable or full. */
export function saveDraft(invoice: Invoice, storage: Storage = localStorage): boolean {
  try {
    storage.setItem(DRAFT_KEY, JSON.stringify(invoice));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(storage: Storage = localStorage): void {
  try {
    storage.removeItem(DRAFT_KEY);
  } catch {
    // Storage unavailable: nothing to clear.
  }
}
