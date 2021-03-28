import React from 'react'
import {
  Body,
  List,
  ListItem,
  Text,
  Left,
} from 'native-base';

export default RegisterList = ({ regs }) => {
  const renderItems = (reg, index) =>
    <ListItem>
      <Left
        style={{
          flex: 2,
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

  return (
    <List
      dataArray={regs}
      keyExtractor={(data, index) => index.toString()}
      renderRow={(value, index) => renderItems(value, index)}
    />
  )
}