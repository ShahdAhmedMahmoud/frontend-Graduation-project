export default function CodeAssistantPage() {
  return (
    <div className="h-screen">
      <iframe
        src="http://localhost:5173"
        className="w-full h-full"
        style={{ border: "none" }}
        title="Code Assistant"
      />
    </div>
  );
}