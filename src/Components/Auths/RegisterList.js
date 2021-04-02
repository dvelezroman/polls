import React, { useCallback, useState } from 'react'
import { RefreshControl } from 'react-native'
import {
  Body,
  List,
  ListItem,
  Text,
  Title,
  Left,
} from 'native-base';

export default RegisterList = ({ regs, visible, from, onRefresh, refreshing }) => {
  const renderNoVisible = () =>
    <Title
      style={{ fontSize: 20, alignSelf: 'center' }}
    >
      Su perfil de usuario no permite visualizar esta información.
      </Title>

  const renderItems = (reg, index) =>
    <ListItem>
      <Left
        style={{
          flexDirection: 'column'
        }}
      >
        <Text
          style={{ fontSize: 24 }}
        >{`${reg.mesa} - ${reg.sexo[0]}`}</Text>
      </Left>
      <Body style={{ flex: 5 }}>
        <Text
          style={{
            fontSize: 14,
            flex: 3
          }}
        >
          {`${reg.parroquia} - ${reg.recinto}`}
        </Text>
        <Text
          style={{ fontSize: 14 }}
        >{`Guillermo Lasso: ${reg.lasso} / Lelo Arauz: ${reg.lelo}`}</Text>
        <Text
          style={{ fontSize: 14 }}
        >{`Blancos: ${reg.blancos
          } -- Nulos: ${reg.nulos}`}</Text>
      </Body>
      {/* <Right style={{ flex: 1 }}>
        <Icon name="arrow-forward" />
      </Right> */}
    </ListItem>

  if (from === "AdminScreen") {
    if (!visible) {
      return renderNoVisible()
    }
  }

  return (
    <List
      refreshControl={<RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
      style={{ backgroundColor: 'white' }}
      dataArray={regs}
      keyExtractor={(data, index) => index.toString()}
      renderRow={(value, index) => renderItems(value, index)}
    />
  )
}
