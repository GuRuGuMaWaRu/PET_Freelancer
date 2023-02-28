interface Error {
  message: string | undefined;
}

type ErrorVariant = "stacked" | "inline";

export type { Error, ErrorVariant };