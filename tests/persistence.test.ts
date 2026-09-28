import { describe, expect, it } from "vitest";
import { clearDraft, DRAFT_KEY, loadDraft, saveDraft } from "@/lib/invoice/persistence";
import { sampleInvoice } from "./fixtures";

function memoryStorage(): Storage {
  const data = new Map<string, string>();
  return {
    get length() {
      return data.size;
    },
    clear: () => data.clear(),
    getItem: (k) => data.get(k) ?? null,
    key: (i) => [...data.keys()][i] ?? null,
    removeItem: (k) => void data.delete(k),
    setItem: (k, v) => void data.set(k, String(v)),
  };
}

describe("draft persistence", () => {
  it("round-trips a draft", () => {
    const storage = memoryStorage();
    const inv = sampleInvoice();
    expect(saveDraft(inv, storage)).toBe(true);
    expect(loadDraft(storage)).toEqual(inv);
  });
  it("returns null for missing, corrupt or invalid data", () => {
    const storage = memoryStorage();
    expect(loadDraft(storage)).toBeNull();
    storage.setItem(DRAFT_KEY, "{not json");
    expect(loadDraft(storage)).toBeNull();
    storage.setItem(DRAFT_KEY, JSON.stringify({ version: 1, items: "nope" }));
    expect(loadDraft(storage)).toBeNull();
  });
  it("reports failure when storage is full or blocked", () => {
    const storage = memoryStorage();
    storage.setItem = () => {
      throw new DOMException("quota", "QuotaExceededError");
    };
    expect(saveDraft(sampleInvoice(), storage)).toBe(false);
  });
  it("clears the draft", () => {
    const storage = memoryStorage();
    saveDraft(sampleInvoice(), storage);
    clearDraft(storage);
    expect(loadDraft(storage)).toBeNull();
  });
});
