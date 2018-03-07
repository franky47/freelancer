import React from 'react'
import Header from './Header'
import SidePanel from './Panel'
import Settings from './Settings'

const Display = ({ dailyRate, taxRate, numDays }) => {
  const plural = val => (val > 1 ? 's' : '')
  const weeks = Math.floor(numDays / 5)
  const days = numDays % 5
  let text = ''
  if (weeks > 0) {
    text += `${weeks} Week${plural(weeks)}`
    if (days > 0) {
      text += ' + '
    }
  }
  if (days > 0) {
    text += `${days} Day${plural(days)}`
  }
  const locale = 'fr-FR'

  return (
    <section className="display">
      <h1>{text}</h1>
      <h3>Invoiced: {(numDays * dailyRate).toLocaleString(locale)}€</h3>
      <h3>
        Income: {(numDays * dailyRate * (1.0 - taxRate * 0.01)).toLocaleString(locale)}€
      </h3>
    </section>
  )
}

// --

const Controls = ({ addDay, addWeek, subDay, subWeek, numDays }) => (
  <section className="controls">
    <button onClick={subWeek} disabled={numDays <= 0}>
      -5
    </button>
    <button onClick={subDay} disabled={numDays <= 0}>
      -1
    </button>
    <button onClick={addDay}>+1</button>
    <button onClick={addWeek}>+5</button>
  </section>
)

// --

export default class App extends React.Component {
  state = {
    numDays: 1,
    panelVisible: false,
    dailyRate: 400,
    taxRate: 22
  }

  render() {
    const { numDays, panelVisible, dailyRate, taxRate } = this.state

    return (
      <main>
        <Header onMenuClick={this._togglePanel} />
        <SidePanel onCloseClicked={this._togglePanel} visible={panelVisible}>
          <Settings
            dailyRate={dailyRate}
            taxRate={taxRate}
            onEditDailyRate={this._onEditDailyRate}
            onEditTaxRate={this._onEditTaxRate}
          />
        </SidePanel>
        <Controls
          numDays={numDays}
          addWeek={this._addWeek}
          subWeek={this._subWeek}
          addDay={this._addDay}
          subDay={this._subDay}
        />
        <Display dailyRate={dailyRate} taxRate={taxRate} numDays={numDays} />
      </main>
    )
  }
  _togglePanel = () => {
    this.setState(prevState => ({
      panelVisible: !prevState.panelVisible
    }))
  }
  _addDay = () => {
    this.setState(prevState => ({
      numDays: prevState.numDays + 1
    }))
  }
  _subDay = () => {
    this.setState(prevState => ({
      numDays: Math.max(prevState.numDays - 1, 0)
    }))
  }
  _addWeek = () => {
    this.setState(prevState => ({
      numDays: prevState.numDays + 5
    }))
  }
  _subWeek = () => {
    this.setState(prevState => ({
      numDays: Math.max(prevState.numDays - 5, 0)
    }))
  }
  _onEditDailyRate = value => {
    this.setState({
      dailyRate: value
    })
  }
  _onEditTaxRate = value => {
    this.setState({
      taxRate: value
    })
  }
}
