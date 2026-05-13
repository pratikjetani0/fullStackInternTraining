// You're building a payment service. When a transaction fails, you get one of four error types. Each has different fields and requires a different response. Without narrowing, you'd use any and guess fields. With narrowing, TS guarantees you only access valid fields for each error type.

//! Type Narrowing
// A union type like string | number | null says "could be any of these." But before you do .toUpperCase(), you need to prove to TypeScript it's a string right now. That proof is called narrowing.

// ApiError and ValidationError: plain objects with a "kind" field
type ApiError = {
  kind: "api";        // exact literal string "api"
  statusCode: number;
  message: string;
};

type ValidationError = {
  kind: "validation";        // exact literal string "validation"
  fields: string[];      // array of field names that failed
};

type UnknownError = {
  kind: "unknown";
  raw: unknown;
};

// NetworkError: a CLASS (so instanceof works)
class NetworkError {
  constructor(
    public url: string,
    public timeout: boolean
  ) {}
}

// The union of all possible payment errors
type PaymentError = ApiError | ValidationError | UnknownError | NetworkError;


// Returns true if val is an UnknownError — use the "is" keyword
function isUnknownError(val: PaymentError): val is UnknownError {
  return (
    typeof val === "object" &&
    val !== null &&
    "kind" in val &&
    (val as any).kind === "unknown"
  );
}


function handlePaymentError(err: PaymentError): string {

  // instanceof narrows to the NetworkError class
  if (err instanceof NetworkError) {
    return `Network failed: ${err.url} (timeout: ${err.timeout})`;  // .url exists here
  }

  // custom type guard — narrows to UnknownError
  if (isUnknownError(err)) {
    return `Unknown error: ${JSON.stringify(err.raw)}`;
  }

  // discriminated union — switch on .kind
  switch (err.kind) {
    case "api":
      return `API error ${err.statusCode}: ${err.message}`;
    case "validation":
      return `Invalid fields: ${err.fields.join(", ")}`;
  }
}