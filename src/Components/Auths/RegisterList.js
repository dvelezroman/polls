import React from 'react'
import { RefreshControl } from 'react-native'
import {
  Body,
  Icon,
  List,
  ListItem,
  Text,
  Title,
  Left,
  Right,
  Button,
} from 'native-base';

export default RegisterList = ({ regs, visible, from, onRefresh, refreshing, removeItem, uploaded }) => {
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
          flexDirection: 'column',
          backgroundColor: reg.sexo === 'Mujeres' ? 'pink' : 'gray',
          borderRadius: 10,
          padding: 5,
        }}
      >
        <Text
          style={{ fontSize: 20 }}
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
        >{`Guillermo Lasso: ${reg.lasso} / Andres Arauz: ${reg.lelo}`}</Text>
        <Text
          style={{ fontSize: 14 }}
        >{`Blancos: ${reg.blancos
          } -- Nulos: ${reg.nulos}`}</Text>
      </Body>
      {(!uploaded && !visible) && <Right style={{ flex: 1 }}>
        <Button
          onPress={() => removeItem(reg)}
          rounded
          style={{ backgroundColor: 'white' }}
        >
          <Icon name="trash-outline" style={{ fontSize: 18, color: 'red' }} />
        </Button>
      </Right>}
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
