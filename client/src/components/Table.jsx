// component import
import TransactionItem from "./TransactionItem"

const Table = ({ transactions, showPlan = true, showAsset = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            { (showPlan && !showAsset) && 
              ["Name", "Amount", "Date", "Plan", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }

            { (showAsset && !showPlan) && 
              ["Name", "Amount", "Date", "Asset", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }

            { (showAsset && showPlan) && 
              ["Name", "Amount", "Date", "Plan", "Asset", "Delete"].map(
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
                <TransactionItem transaction={transaction} showPlan={showPlan} showAsset={showAsset}/>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Table