export default function SectionCard({ title, children }) {
  return (
    <div className="bg-white p-4 border rounded shadow-sm mb-6">
      {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
      {children}
    </div>
  );
}
