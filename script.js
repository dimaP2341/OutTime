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

// const data = [
//   {
//     from: '2023-05-31T06:12:00+00:00',
//     to: '2023-05-31T06:14:22+00:00',
//   },
//   {
//     from: '2023-05-31T07:00:10+00:00',
//     to: '2023-05-31T07:33:45+00:00',
//   },
//   {
//     from: '2023-05-31T08:10:30+00:00',
//     to: '2023-05-31T08:12:10+00:00',
//   },
//   {
//     from: '2023-05-31T09:45:00+00:00',
//     to: '2023-05-31T09:48:30+00:00',
//   },
//   {
//     from: '2023-05-31T10:00:15+00:00',
//     to: '2023-05-31T10:03:59+00:00',
//   },
//   {
//     from: '2023-05-31T11:20:00+00:00',
//     to: '2023-05-31T11:21:40+00:00',
//   },
//   {
//     from: '2023-05-31T13:33:33+00:00',
//     to: '2023-05-31T13:35:12+00:00',
//   },
//   {
//     from: '2023-05-31T14:00:00+00:00',
//     to: '2023-05-31T14:02:20+00:00',
//   },
//   {
//     from: '2023-05-31T15:10:05+00:00',
//     to: '2023-05-31T15:13:45+00:00',
//   },
//   {
//     from: '2023-05-31T16:30:00+00:00',
//     to: '2023-05-31T16:34:21+00:00',
//   },
//   {
//     from: '2023-05-31T17:50:10+00:00',
//     to: '2023-05-31T17:52:55+00:00',
//   },
// ]

let today = document.querySelector('.today')
let visits = document.querySelector('.visits')
let timeline = document.querySelector('.timeline')

const SECONDS_IN_DAY = 86400
const [day, month, date] = Intl.DateTimeFormat('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
  .format(new Date(data[0].from))
  .split(' ')
today.textContent = `${day.slice(0, 3)} ${date} ${month}`
visits.textContent = visits.textContent = data?.length === 1 ? `${data.length} visit` : `${data.length} visits`

const getSeconds = (date) => {
  const d = new Date(date)
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()
}

data.forEach((item, index) => {
  const from = getSeconds(item.from)
  const to = getSeconds(item.to)

  if (index === 0 && from > 0) {
    const initialGap = document.createElement('div')
    initialGap.classList = 'segment gap'
    initialGap.style.flexBasis = `${(from / SECONDS_IN_DAY) * 100}%`
    timeline.appendChild(initialGap)
  } else if (index > 0) {
    const prevTo = getSeconds(data[index - 1].to)
    const gapSize = from - prevTo
    if (gapSize > 900) {
      const gap = document.createElement('div')
      gap.classList = 'segment gap'
      gap.style.flexBasis = `${(gapSize / SECONDS_IN_DAY) * 100}%`
      timeline.appendChild(gap)
    } else {
      const gap = document.createElement('div')
      gap.classList = 'segment overlap'
      gap.style.flexBasis = `${(gapSize / SECONDS_IN_DAY) * 100}%`
      timeline.appendChild(gap)
    }
  }

  const visit = document.createElement('div')
  visit.classList = 'segment visit'
  visit.style.flexBasis = `${((to - from) / SECONDS_IN_DAY) * 100}%`
  timeline.appendChild(visit)
})

const lastTo = getSeconds(data[data.length - 1].to)
if (lastTo < SECONDS_IN_DAY) {
  const finalGap = document.createElement('div')
  finalGap.classList = 'segment gap'
  finalGap.style.flexBasis = `${((SECONDS_IN_DAY - lastTo) / SECONDS_IN_DAY) * 100}%`
  timeline.appendChild(finalGap)
}
