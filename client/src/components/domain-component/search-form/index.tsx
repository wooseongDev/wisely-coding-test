import { Button, Modal, Radio, RadioGroup, Stack, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { newDate } from '@tools/util/dayjs.util'
import { queryString } from '@tools/util/queryString.util'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'tabler-icons-react'

import { completedRadioGroup, useSearchForm } from './hook'

export type SearchFormProps = {
  isOpen: boolean
  onClose: () => void
}

export const SearchForm: React.FC<SearchFormProps> = (props) => {
  const { isOpen, onClose } = props

  const {
    buildBody,
    resetAll,

    text,
    onChangeText,

    isCompleted,
    onChangeCompleted,

    createdAt,
    onChangeCreatedAt,

    updatedAt,
    onChangeUpdatedAt,
  } = useSearchForm()
  const navigate = useNavigate()

  const onModalClose = () => {
    resetAll()
    onClose()
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onModalClose()
    navigate({
      pathname: '/search',
      search: queryString.stringify(buildBody()),
    })
  }

  return (
    <Modal centered title="검색하기" opened={isOpen} onClose={onModalClose}>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput label="내용" placeholder="내용" value={text} onChange={onChangeText} />

          <RadioGroup label="완료여부" value={isCompleted} onChange={onChangeCompleted}>
            {completedRadioGroup.map((radio) => (
              <Radio key={radio.value} value={radio.value} label={radio.label} />
            ))}
          </RadioGroup>

          <DatePicker
            label="작성일"
            placeholder="작성일"
            value={createdAt}
            onChange={onChangeCreatedAt}
            maxDate={newDate()}
            inputFormat="YYYY-MM-DD"
          />
          <DatePicker
            label="최종수정일"
            placeholder="최종수정일"
            value={updatedAt}
            onChange={onChangeUpdatedAt}
            maxDate={newDate()}
            inputFormat="YYYY-MM-DD"
          />

          <Button type="submit" leftIcon={<Search size="16" />}>
            검색
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}
