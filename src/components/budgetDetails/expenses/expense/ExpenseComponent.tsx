// styles import

type ExpenseComponentPropsType = {
  name: string;
  group: string;
}

const ExpenseComponent = ({name, group} : ExpenseComponentPropsType) => {
  return (
    <>
      <td>{name}</td>
      <td>{group}</td>
    </>
  )
}

export default ExpenseComponent