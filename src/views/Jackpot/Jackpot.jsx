import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'material-ui';

import { getJackpotByDate, addJackpot, } from '../../actions';

import { CustomDatepicker, RegularCard, JackpotTable, ItemGrid, CustomInput } from 'components';

import AddJackpotModal from './Modals/AddJackpot';
import EditJackpotModal from './Modals/EditJackpot';


class Jackpot extends Component {
    state = {
        from: '2018-05-21',
        to: '2018-05-21',
        showAddJackpotModal: false,
        showEditJackpotModal: false,
    };

    componentDidMount() {
        this.setState({ from: this.dateNow(), to: this.dateNow() }, this._getJackpots);
    }

    from = event => {
        this.setState({ from: event.target.value }, this._getJackpots);
    };

    to = event => {
        this.setState({ to: event.target.value }, this._getJackpots);
    };

    total = () => {
        let total = 0;

        for (let jackpot of this.props.jackpots) {
            total += Number(jackpot.amount);
        }

        return total.toFixed(2);
    };

    _getJackpots = () => {
        this.props.getJackpotByDate(this.state.from, this.state.to);
    };

    dateNow = () => {
        let date = new Date(),
            year = String(date.getFullYear()),
            month = String(date.getMonth() + 1), // Month starts from 0 so add 1 to make up for the 0.
            day = String(date.getDate());

        if (month.length === 1) {
            month = `0${month}`;
        }

        if (day.length === 1) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };
    
    render() {
        return (
            <Grid container>
                <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        padIt
                        cardTitle="Jackpot"
                        cardSubtitle="List of jackpot entries in the system"
                        button={
                            <Button 
                                style={ styles.addTransactionButton } 
                                onClick={() => this.setState({ showAddJackpotModal: true })}>ADD JACKPOT</Button>
                        }
                        total={
                            <div>
                                <CustomInput
                                    disabled
                                    labelText="Total Amount"
                                    id="total-amount"
                                    formControlProps={{ fullWidth: true }}
                                    type="number"
                                    value={ this.total() }
                                />
                            </div>
                        }
                        date_picker={
                            <div style={ styles.datepickers }>
                                <div style={{ paddingRight: 10 }}>
                                    <CustomDatepicker
                                        label="From"
                                        value={this.state.from}
                                        onChange={this.from}
                                    />
                                </div>
                                <div>
                                    <CustomDatepicker
                                        label="To"
                                        value={this.state.to}
                                        onChange={this.to}
                                    />
                                </div>
                            </div>
                        }
                        content={
                            <JackpotTable
                                tableHeaderColor="primary"
                                tableHead={['No.', 'Name', 'Amount', 'Date Added', 'Date Updated', '']}
                                tableData={this.props.jackpots}
                                editTransaction={() => this.setState({ showEditJackpotModal: true })}
                            />
                        }
                    />
                </ItemGrid>
                
                <AddJackpotModal
                    open={this.state.showAddJackpotModal}
                    close={() => this.setState({ showAddJackpotModal: false })}
                    addJackpot={this.props.addJackpot}
                    refresh={this._getJackpots}
                />

                <EditJackpotModal
                    open={this.state.showEditJackpotModal}
                    close={() => this.setState({ showEditJackpotModal: false })}
                    addJackpot={this.props.addJackpot}
                    refresh={this._getJackpots}
                />
            </Grid>
        );
    }
}

const styles = {
    addTransactionButton: {
        color: '#FFF',
        backgroundColor: 'purple',
        marginLeft: 20,
    },
    datepickers: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

const mapStateToProps = state => {
    const { jackpots } = state.jackpots;

    return { jackpots };
};

export default connect(mapStateToProps, { getJackpotByDate, addJackpot, })(Jackpot);
