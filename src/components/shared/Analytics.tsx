export function Analytics() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          console.log("Zonked - Indian Entertainment Hub");
        `,
      }}
    />
  );
}
