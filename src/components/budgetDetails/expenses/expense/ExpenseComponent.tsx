// styles import

type ExpenseComponentPropsType = {
  name: string;
  group: string;
  value: number;
}

const ExpenseComponent = ({name, group, value} : ExpenseComponentPropsType) => {
  return (
    <>
      <td>{name}</td>
      <td>{group}</td>
      <td>{value}</td>
    </>
  )
}

export default ExpenseComponent