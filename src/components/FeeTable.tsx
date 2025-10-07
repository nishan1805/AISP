import React from "react";

interface FeeRow {
    className: string;
    fee: string | number;
}

interface FeeTableProps {
    title: string;
    rows: FeeRow[];
}

const FeeTable: React.FC<FeeTableProps> = ({ title, rows }) => (
    <div className="rounded-t-lg overflow-hidden w-full my-[20px]">
        {title && (
            <div className="bg-[#3C3C87] text-white font-bold text-lg p-3">{title}</div>
        )}
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-[#3C3C87] text-white">
                    <th className="border p-3 text-left font-semibold">Class</th>
                    <th className="border p-3 text-left font-semibold">Admission Fees</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={row.className} className={idx % 2 === 0 ? "bg-white" : "bg-[#F6F6FF]"}>
                        <td className="border p-3">{row.className}</td>
                        <td className="border p-3">{row.fee}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default FeeTable;