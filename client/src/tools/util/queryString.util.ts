import qs from 'query-string'

const parseSearchParams = (searchParams: URLSearchParams) => qs.parse(searchParams.toString())

export const queryString = {
  ...qs,
  parseSearchParams,
}
