import React, { Component } from 'react';
import { connect } from 'react-redux';
import sumBy from 'lodash/sumBy';
import Spinner from 'react-native-loading-spinner-overlay';

import {
  Container,
  Badge,
  Header,
  Body,
  Button,
  Icon,
  Right,
  Text,
  Subtitle,
  Title,
  Left,
  Footer,
  Picker,
  Content,
} from 'native-base';

import RegisterList from './RegisterList';
import { firebaseDataBase } from '../../Store/Services/Firebase';

import { tosagua } from './Mock';
const data = tosagua;

const mapStateToProps = state => ({
  regs: state.registerReducer,
  loading: state.loadingReducer,
  user: state.userReducer,
});

class ResumeAdminScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registers: [],
      filteredRegisters: [],
      refreshing: false,
      parroquia: 'Todas',
      junta: 'Juntas',
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true, parroquia: "Todas" })
    this.getRegistersFromFirebase();
  }

  onSelect = (name, value) => {
    if (value === 'Todas') {
      this.setState({ [name]: value, filteredRegisters: [...this.state.registers] })
    } else {
      const filteredRegisters = this.state.registers.filter(reg => reg.parroquia === value);
      this.setState({ [name]: value, filteredRegisters });
    }
  }

  parseRegisters = (registers) => {
    return registers ? Object.keys(registers).map(key => registers[key]) : [];
  }

  getRegistersFromFirebase = () => {
    const ref = firebaseDataBase.ref('actas/Tosagua');
    ref.on('value', (snapshot) => {
      const registers = this.parseRegisters(snapshot.val());
      this.setState({ registers, filteredRegisters: registers, refreshing: false })
    });
  }

  componentDidMount() {
    this.getRegistersFromFirebase();
  }

  render = () => {
    const { user } = this.props;
    const { registers, refreshing, filteredRegisters } = this.state;

    return (
      <Container style={{ backgroundColor: 'white' }}>
        <Header
          style={{
            marginTop: 25
          }}
        >
          <Left style={{ alignSelf: 'center', flex: 1 }}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={{ alignSelf: 'center', flex: 4 }}>
            <Title
              style={{ fontSize: 20, alignSelf: 'center' }}
            >
              Registro Total
            </Title>
            <Subtitle
              style={{ fontSize: 14, alignSelf: 'center' }}
            >
              de Juntas Ingresadas
            </Subtitle>
          </Body>
          <Right style={{ alignSelf: 'center', flex: 1 }}>
            <Badge info>
              <Text>{user.username[0]}</Text>
            </Badge>
          </Right>
        </Header>
        <Content>
          <Subtitle
            style={{ marginTop: 10, fontSize: 14, alignSelf: 'center', color: 'gray' }}
          >
            Filtro por Parroquias
        </Subtitle>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ flex: 1, width: '100%', height: 40 }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.parroquia}
            onValueChange={value => this.onSelect('parroquia', value)}
          >
            {[{ label: "Todas", value: "Todas" }, ...data.parroquias].map((item, i) => (
              <Picker.Item
                key={i}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>
          <Subtitle
            style={{ marginTop: 10, fontSize: 14, alignSelf: 'center', color: 'gray' }}
          >
            Lista de Resultados
        </Subtitle>
          {!this.props.loading ? (
            <RegisterList
              regs={filteredRegisters}
              visible={user.admin}
              from="AdminScreen"
              onRefresh={this.onRefresh}
              refreshing={refreshing}
            />
          ) : (
            <Spinner
              visible={this.props.loading}
              animation="fade"
              cancelable={false}
              textStyle={{ color: 'blue' }}
            />
          )
          }
        </Content>
        <Footer style={{ paddingHorizontal: 10, paddingTop: 20, paddingBottom: 20 }}>
          <Left style={{ flex: 1 }}>
            <Text style={{ color: 'white' }}>Totales: </Text>
            <Text style={{ marginLeft: 10, color: 'white' }}>
              {`Lasso ${sumBy(filteredRegisters, reg => parseInt(reg.lasso))} / Arauz: ${sumBy(filteredRegisters, reg => parseInt(reg.lelo))} / Blancos ${sumBy(filteredRegisters, reg => parseInt(reg.blancos))} / Nulos ${sumBy(filteredRegisters, reg => parseInt(reg.nulos))}`}
            </Text>
            
          </Left>
          {/* <Body style={{ flex: 2, justifyContent: 'center' }}>
          </Body> */}

          {/* <Right style={{ flex: 1 }} /> */}
        </Footer>
      </Container>
    );
  };
}

export default connect(
  mapStateToProps,
)(ResumeAdminScreen);