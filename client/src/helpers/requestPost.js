export async function requestPost(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const answ = await response.json()
  console.log('1')
  console.log(answ)
  return answ
}