import React from 'react'

class AutoSelectInput extends React.PureComponent {
  render() {
    return <input {...this.props} ref={this._makeRef} onFocus={this._onFocus} />
  }
  _makeRef = input => {
    this.input = input
  }
  _onFocus = event => {
    this.input.select()
    if (this.props.onFocus) {
      this.props.onFocus(event)
    }
  }
}

export default class Settings extends React.PureComponent {
  render() {
    const { dailyRate, taxRate } = this.props
    return (
      <section className="settings">
        <label>Daily Rate €</label>
        <AutoSelectInput
          type="number"
          step={10}
          onChange={this._onEditDailyRate}
          value={dailyRate}
        />

        <label>Tax Rate %</label>
        <AutoSelectInput
          type="number"
          onChange={this._onEditTaxRate}
          value={taxRate}
        />
      </section>
    )
  }

  _onEditDailyRate = ({ target }) => {
    this.props.onEditDailyRate(parseInt(target.value, 10))
  }
  _onEditTaxRate = ({ target }) => {
    this.props.onEditTaxRate(parseFloat(target.value))
  }
}
