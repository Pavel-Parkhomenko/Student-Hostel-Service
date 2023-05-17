const MONTH = {
  Sep: 0,
  Oct: 1,
  Nov: 2,
  Dec: 3,
  Jan: 4,
  Feb: 5,
  Mar: 6,
  Apr: 7,
  May: 8,
  Jun: 9,
  Jul: 10,
  Aug: 11,
}
export function paymentHelp(dateInHostel, sumHostel, sum) {
  try {
    const monthCur = new Date(dateInHostel).toLocaleString('eng', { month: 'short' })
    const num = MONTH[monthCur]
    const shortSumHostel = sumHostel.slice(num)
    const fullSumShort = shortSumHostel.reduce((partialSum, a) => partialSum + a, 0);
    if(sum < fullSumShort) return <span className="text-danger">Задолженность {fullSumShort - sum} BYN</span>
    else return (
      <span className="text-success">
        Задолженности нет. На счету {Math.abs(fullSumShort - sum)} BYN</span>
    )
  } catch (err) {
    return ''
  }
}

export function sumHostelStudent(pays) {
  if(!pays) return 0
  return pays.reduce(function (sum, elem) {
    return sum + elem.payment;
  }, 0)
}

export function fullSumHostel(costsHostel) {
  if(!costsHostel) return 0
  return costsHostel.reduce(function (sum, elem) {
    return sum + elem;
  }, 0)
}