const convertPrice = (node) => {
  return new Intl.NumberFormat('ru-Ru', {
    currency: 'rub',
    style: 'currency'
  }).format(node)
}

document.querySelectorAll('.price').forEach(node => {
  node.textContent = convertPrice(node.textContent)
})

const card = document.querySelector('#card')
if (card) {
  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
      const id = e.target.dataset.id
      fetch('/card/delete/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then((response) => response.json())
        .then(({ courses, price }) => {
          if (!courses.length) {
            card.innerHTML = '<p>Card is empty</p>'
            return true
          }

          const priceNode = card.querySelector('.price')
          const tbody = card.querySelector('tbody')
          priceNode.innerHTML = convertPrice(price)
          tbody.innerHTML = courses.map(({ id, title, count }) => {
            return `
              <tr>
                <td>${title}</td>
                <td>${count}</td>
                <td>
                  <button data-id="${id}" class="btn-delete btn btn-small">delete</button>
                </td>
              </tr>`
          }).join('')
        })
    }
  })
}
