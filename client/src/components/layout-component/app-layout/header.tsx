import { SearchForm } from '@components/domain-component/search-form'
import { css } from '@emotion/react'
import { useModal } from '@hooks/use-modal'
import { Button, Group, Text } from '@mantine/core'
import { maxContentWidthCss } from '@tools/styles/style.util'
import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'tabler-icons-react'

export const Header: React.FC = () => {
  const { isOpen, onOpen, onClose } = useModal()

  return (
    <>
      <header css={rootStyle}>
        <Group position="apart" css={innerStyle}>
          <Link to="/">
            <Text component="h1" color="indigo" size="xl" weight="600">
              Wisely todo list
            </Text>
          </Link>

          <Button variant="outline" size="xs" rightIcon={<Search size={16} />} onClick={onOpen}>
            검색하기
          </Button>
        </Group>
      </header>

      <SearchForm isOpen={isOpen} onClose={onClose} />
    </>
  )
}

const rootStyle = css`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 3;
`

const innerStyle = css`
  ${maxContentWidthCss};
  padding: 0 20px;
`
