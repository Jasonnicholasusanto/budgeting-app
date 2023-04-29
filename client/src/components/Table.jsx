// component import
import TransactionItem from "./TransactionItem"

const Table = ({ transactions }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {
              ["Name", "Amount", "Date", "Plan", "Delete"].map((i, index) => (
                <th key={index}>{i}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <TransactionItem transaction={transaction} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Table