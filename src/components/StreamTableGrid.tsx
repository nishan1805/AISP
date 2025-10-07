import React from "react";

interface Subject {
  id: number;
  name: string;
}

interface StreamTableGridProps {
  streamName: string;
  subjects: Subject[];
}

const StreamTableGrid: React.FC<StreamTableGridProps> = ({ streamName, subjects }) => {
  // Split subjects into two columns for md and up
  const left = subjects.slice(0, 3);
  const right = subjects.slice(3, 6);

  return (
    <div className="rounded-t-lg overflow-hidden w-full my-[20px]">
      {/* Table Header */}
      <div className="bg-[#3C3C87] text-white font-bold text-lg p-3">{streamName}</div>
      {/* Table Body */}
      {/* Responsive: single column on xs, two columns on md+ */}
      <table className="w-full border-collapse">
        <tbody>
          {/* xs: show all subjects in one column */}
          <tr className="md:hidden">
            <td colSpan={4} className="p-0 border-none">
              <table className="w-full border-collapse">
                <tbody>
                  {subjects.map((subject, idx) => (
                    <tr key={subject.id} className={idx % 2 === 0 ? "bg-white" : "bg-[#F6F6FF]"}>
                      <td className="border p-3 text-center w-[40px]">{subject.id}</td>
                      <td className="border p-3">{subject.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
          {/* md+: two columns */}
          {[0, 1, 2].map((rowIdx) => (
            <tr key={rowIdx} className="hidden md:table-row">
              {/* Left column */}
              <td className="border p-3 text-center w-[40px]">{left[rowIdx]?.id}</td>
              <td className="border p-3">{left[rowIdx]?.name}</td>
              {/* Right column */}
              <td className="border p-3 text-center w-[40px]">{right[rowIdx]?.id}</td>
              <td className="border p-3">{right[rowIdx]?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StreamTableGrid;