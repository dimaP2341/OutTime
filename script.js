const data = [
  {
    from: '2023-05-30T05:56:28+00:00',
    to: '2023-05-30T05:57:10+00:00',
  },
  {
    from: '2023-05-30T06:01:01+00:00',
    to: '2023-05-30T06:49:31+00:00',
  },
  {
    from: '2023-05-30T07:04:21+00:00',
    to: '2023-05-30T07:05:26+00:00',
  },
  {
    from: '2023-05-30T08:27:42+00:00',
    to: '2023-05-30T08:28:52+00:00',
  },
  {
    from: '2023-05-30T08:29:43+00:00',
    to: '2023-05-30T08:31:28+00:00',
  },
  {
    from: '2023-05-30T10:19:15+00:00',
    to: '2023-05-30T10:21:02+00:00',
  },
  {
    from: '2023-05-30T16:50:26+00:00',
    to: '2023-05-30T16:50:49+00:00',
  },
  {
    from: '2023-05-30T17:03:12+00:00',
    to: '2023-05-30T17:04:24+00:00',
  },
  {
    from: '2023-05-30T17:05:11+00:00',
    to: '2023-05-30T17:05:55+00:00',
  },
  {
    from: '2023-05-30T19:29:46+00:00',
    to: '2023-05-30T19:31:04+00:00',
  },
  {
    from: '2023-05-30T20:42:28+00:00',
    to: '2023-05-30T20:43:31+00:00',
  },
]

let today = document.querySelector('.today')
let visits = document.querySelector('.visits')
let timeline = document.querySelector('.timeline')

const [day, month, date] = new Date().toDateString().split(' ').slice(0, 3)

today.textContent = `${day} ${date} ${month}`
visits.textContent = visits.textContent = data?.length === 1 ? `${data.length} visit` : `${data.length} visits`

const getSeconds = (date) => {
  const d = new Date(date)
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()
}

for (let i = 0; i < data.length; i++) {
  const from = getSeconds(data[i].from)
  const to = getSeconds(data[i].to)
  const duration = to - from

  const visit = document.createElement('div')
  visit.classList = 'segment visit'
  visit.style.flexBasis = `${(duration / 86400) * 100}%`

  const next = data[i + 1]
  if (next) {
    const gap = getSeconds(next.from) - to

    if (gap <= 900) {
      visit.style.marginRight = '-6px'
      visit.style.zIndex = `${100 - i}`
    } else {
      const gapDiv = document.createElement('div')
      gapDiv.classList = 'segment gap'
      gapDiv.style.flexBasis = `${(gap / 86400) * 100}%`
      timeline.appendChild(visit)
      timeline.appendChild(gapDiv)
    }
  }
  timeline.appendChild(visit)
}

window.addEventListener('resize', () => {
  console.log('Resize')
})
