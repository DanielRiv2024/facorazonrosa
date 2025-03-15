export default function BillingTable({ sales }) {
    return (
      <div className="overflow-x-auto bg-black border border-white p-2 rounded-md m-2">
        <table className="min-w-full bg-[#1F1F22] border border-black rounded-md ">
          <thead className="bg-[#1F1F22] rounded-lg">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Total de Ítems</th>
              
              <th className="px-4 py-2 border-b">Fecha</th>
              <th className="px-4 py-2 border-b">Colaborador</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className="border-t">
                <td className="px-4 py-2 text-center">{sale.id}</td>
                <td className="px-4 py-2 text-center">{sale.itemsTotal}</td>
                <td className="px-4 py-2 text-center">{new Date(sale.date).toLocaleString()}</td>
                <td className="px-4 py-2 text-center">{sale.collaborator}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
  