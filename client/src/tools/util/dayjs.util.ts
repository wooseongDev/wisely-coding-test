import 'dayjs/locale/ko'

import dayjs from 'dayjs'

const newDate = (date?: string) => dayjs(date).toDate()

export { dayjs, newDate }
