// component import
import TransactionItem from "./TransactionItem"

const Table = ({ transactions, showPlan = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {
              ["Name", "Amount", "Date", showPlan ? "Plan" : "", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <TransactionItem transaction={transaction} showPlan={showPlan}/>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Table