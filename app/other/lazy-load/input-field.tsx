interface SetupProps {
  defaultValue: string;
}

interface RenderProps {
  value?: string;
}

export function InputField({ defaultValue }: SetupProps) {
  return ({ value }: RenderProps) => (
    <label
      css={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        width: "300px",
      }}
    >
      <span css={{ fontWeight: "semibold" }}>Value:</span>
      <input
        type="text"
        value={value ?? defaultValue}
        css={{
          padding: "0.5rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      />
    </label>
  );
}
