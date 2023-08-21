import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Grid, Button, Modal } from 'material-ui';

import { RegularCard, ItemGrid, CustomInput } from 'components';

import { updateGlobalCategory } from '../../../../actions';

class UpdateGlobalCategory extends Component {
    state = {
        id: '',
        name: '',
        mrp: '',
        price: '',
        quantity_added: '',
        quantity_remaining: ''
    };

    getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`
        };
    }

    _setQuantityAdded = event => {
        this.setState({ quantity_added: event.target.value });
    };

    _updateGlobalCategory = () => {
        const 
            id = this.props.globalCategory_to_edit.id,
            quantity_added = Number(this.state.quantity_added),
            quantity_remaining = Number(this.state.quantity_added) + Number(this.props.globalCategory_to_edit.quantity);

        if (id && quantity_added && quantity_remaining) {
            this.props.updateGlobalCategory(id, {quantity_added, quantity_remaining}, this.clearAndRefresh, this.props.successNotification, this.props.errorNotification);
        } else {
            this.props.errorNotification();
        }
    };

    clearAndRefresh = () => {
        this.props.close();
        this.props.refresh();
    }
    
    render() {
        const { classes, open, close, globalCategory_to_edit } = this.props;
        return (
            <Modal
                aria-labelledby="Update Item"
                aria-describedby="Modal for updating item"
                open={open}
                onClose={close}
            >
                <div style={this.getModalStyle()} className={classes.paper}>
                    <Grid container>
                        <ItemGrid xs={12} sm={12} md={12}>
                            <RegularCard
                                cardTitle="UPDATE ITEM"
                                cardSubtitle="Edit the form below to update the selected item"
                                content={
                                    <div>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Item name"
                                                    id="item-name"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="text"
                                                    defaultValue={ globalCategory_to_edit.name }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Unit price"
                                                    id="unit-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    defaultValue={ globalCategory_to_edit.mrp }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Whole price"
                                                    id="whole-price"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    defaultValue={ globalCategory_to_edit.price }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    disabled
                                                    labelText="Quantity Remaining"
                                                    id="quantity-remaining"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    value={ Number(globalCategory_to_edit.quantity_remaining) + Number(this.state.quantity_added) }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                        <Grid container>
                                            <ItemGrid xs={12} sm={12} md={12}>
                                                <CustomInput
                                                    autoFocus
                                                    labelText="Add Quantity"
                                                    id="add-quantity"
                                                    formControlProps={{ fullWidth: true }}
                                                    type="number"
                                                    onChange={ this._setQuantityAdded }
                                                />
                                            </ItemGrid>
                                        </Grid>
                                    </div>
                                }
                                
                                footer={
                                    <Button 
                                        variant="raised" 
                                        style={{ backgroundColor: 'purple', color: 'white' }} 
                                        onClick={this._updateGlobalCategory}
                                    >
                                        Update
                                    </Button>
                                }
                            />
                        </ItemGrid>
                    </Grid>
                </div>
            </Modal>
        );
    }
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 60,
        backgroundColor: 'transparent',
        padding: theme.spacing.unit * 4
    }
});

const mapStateToProps = state => {
    const { globalCategory_to_edit } = state.globalCategoryReducer;
    return { globalCategory_to_edit };
};

const UpdateModalWrapped = withStyles(styles)(UpdateGlobalCategory);

export default connect(mapStateToProps, { updateGlobalCategory })(UpdateModalWrapped);
