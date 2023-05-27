// component import
import TransactionItem from "./TransactionItem"

const Table = ({ isUpcoming = false, transactions, showPlan = true, showAsset = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>

            { ((showPlan && !showAsset) && isUpcoming) && 
              ["Name", "Amount", "Date", "Plan", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }

            { ((showAsset && !showPlan) && isUpcoming) && 
              ["Name", "Amount", "Date", "Asset", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }

            { ((showPlan && !showAsset) && !isUpcoming) && 
              ["Name", "Amount", "Date", "Plan", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }

            { ((showAsset && !showPlan) && !isUpcoming) && 
              ["Name", "Amount", "Date", "Asset", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }

            { ((showAsset && showPlan) && isUpcoming) && 
              ["Name", "Amount", "Date", "Plan", "Asset", "Delete"].map(
                (i, index) => (
                  <th key={index}>{i}</th>
                ))
            }

            { ((showAsset && showPlan) && !isUpcoming) && 
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
                <TransactionItem isUpcoming={isUpcoming} transaction={transaction} showPlan={showPlan} showAsset={showAsset}/>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
export default Table